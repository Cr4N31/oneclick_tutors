const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')
const pool = require('../config/db');

// POST /api/auth/register
router.post('/register', async (req, res) => {
    const { username, firstName, lastName, email, password, level, department, courses } = req.body;
    console.log('Register body:', req.body)

    if( !email || !password || !courses || courses.length < 9 ){
        return res.status(400). json({ error: 'Missing require fields.' });
    }
    const client = await pool.connect();

    try {
        await client.query('BEGIN');

        const existing = await client.query(
            `SELECT id FROM students WHERE email = $1`, [email]
        );
        if (existing.rows.length > 0){
            return res.status(409).json({ error: 'Email already registered.' });
        }

        const password_hash = await bcrypt.hash(password, 10);
        
        const studentRes = await client.query(
        `INSERT INTO students (full_name, email, password_hash, programme, level, raw_courses)
        VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`,
        [
          `${firstName} ${lastName}`,
          email,
          password_hash,
          department || null,
          level ? parseInt(level) : null,
          JSON.stringify(courses)
        ]
      );

        const studentId = studentRes.rows[0].id;

        for (const courseCode of courses) {
        const code = courseCode.trim().toUpperCase().replace(/\s+/g, ' ');
        const courseRes = await client.query(
            `SELECT id FROM courses WHERE UPPER(code) = $1`, [code]
        );
        if (courseRes.rows.length > 0) {
            await client.query(
            `INSERT INTO student_courses (student_id, course_id)
            VALUES ($1, $2) ON CONFLICT DO NOTHING`,
            [studentId, courseRes.rows[0].id]
            );
        }
        }

        await client.query('COMMIT');

        res.status(201).json({
            id: studentId,
            username,
            full_name: `${firstName} ${lastName}`,
            firstName,
            lastName,
            email,
            level,
            department,
            courses,
        });
    } catch(err){
        await client.query('ROLLBACK');
        console.error('Register error:', err.message);
        res.status(500).json({ error: 'Registration failed.', detail: err.message });   
    } finally {
        client.release();
    }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' });
  }

  try {
    const studentRes = await pool.query(
      `SELECT * FROM students WHERE email = $1`, [email]
    );

    if (studentRes.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials.' });
    }

    const student = studentRes.rows[0];
    const valid = await bcrypt.compare(password, student.password_hash);

    if (!valid) {
      return res.status(401).json({ error: 'Invalid credentials.' });
    }

    // Fetch their registered courses
    const coursesRes = await pool.query(
      `SELECT c.code, c.title FROM courses c
       JOIN student_courses sc ON sc.course_id = c.id
       WHERE sc.student_id = $1`,
      [student.id]
    );

    res.json({
      id: student.id,
      username: student.full_name,
      full_name: student.full_name,
      email: student.email,
      level: student.level,
      department: student.programme,
      raw_courses: student.raw_courses,
      courses: coursesRes.rows,
    });

  } catch (err) {
    console.error('Login error:', err.message);
    res.status(500).json({ error: 'Login failed.' });
  }
});

module.exports = router;