const express = require('express');
const router = express.Router();
const pool = require('../config/db');

// GET /api/progress/:studentId
router.get('/:studentId', async (req, res) => {
  const { studentId } = req.params;

  try {
    // Quiz history — most recent first
    const quizHistory = await pool.query(
      `SELECT 
        qa.id, qa.score, qa.total, qa.difficulty, qa.scope, qa.taken_at,
        c.code as course_code, c.title as course_title,
        m.module_number,
        u.unit_number, u.title as unit_title
       FROM quiz_attempts qa
       JOIN courses c ON c.id = qa.course_id
       JOIN modules m ON m.id = qa.module_id
       JOIN units u ON u.id = qa.unit_id
       WHERE qa.student_id = $1
       ORDER BY qa.taken_at DESC`,
      [studentId]
    );

    // Proficiency per course — average score per course
    const proficiency = await pool.query(
      `SELECT 
        c.code as course_code, c.title as course_title,
        ROUND(AVG(qa.score::decimal / qa.total * 100), 1) as avg_score,
        COUNT(qa.id) as attempts,
        MAX(qa.taken_at) as last_attempt
       FROM quiz_attempts qa
       JOIN courses c ON c.id = qa.course_id
       WHERE qa.student_id = $1
       GROUP BY c.code, c.title
       ORDER BY avg_score DESC`,
      [studentId]
    );

    // Weekly performance — scores grouped by week
    const weekly = await pool.query(
      `SELECT 
        c.code as course_code,
        DATE_TRUNC('week', qa.taken_at) as week,
        ROUND(AVG(qa.score::decimal / qa.total * 100), 1) as avg_score,
        COUNT(qa.id) as attempts
       FROM quiz_attempts qa
       JOIN courses c ON c.id = qa.course_id
       WHERE qa.student_id = $1
       AND qa.taken_at >= NOW() - INTERVAL '8 weeks'
       GROUP BY c.code, DATE_TRUNC('week', qa.taken_at)
       ORDER BY week ASC`,
      [studentId]
    );

    res.json({
      quiz_history: quizHistory.rows,
      proficiency: proficiency.rows,
      weekly: weekly.rows,
    });

  } catch (err) {
    console.error('Progress error:', err.message);
    res.status(500).json({ error: 'Failed to fetch progress.' });
  }
});

module.exports = router;