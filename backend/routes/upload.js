const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const { extractText, parseCourseText } = require('../services/pdfParser');
const pool = require('../config/db');

router.post('/', upload.single('pdf'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded.' });
  }

  const { courseCode, courseTitle } = req.body;
  console.log('courseCode received:', courseCode, '| length:', courseCode?.length);
  if (!courseCode || !courseTitle) {
    return res.status(400).json({ error: 'courseCode and courseTitle are required.' });
  }

  const client = await pool.connect();

  try {
    const rawText = await extractText(req.file.buffer);
    const { modules } = parseCourseText(rawText);

    await client.query('BEGIN');

    // Upsert course
    const courseRes = await client.query(
      `INSERT INTO courses (code, title)
       VALUES ($1, $2)
       ON CONFLICT (code) DO UPDATE SET title = EXCLUDED.title
       RETURNING id`,
      [courseCode.toUpperCase(), courseTitle]
    );
    const courseId = courseRes.rows[0].id;

    // Insert modules and units
    for (const mod of modules) {
      const modRes = await client.query(
        `INSERT INTO modules (course_id, module_number, title)
         VALUES ($1, $2, $3)
         ON CONFLICT (course_id, module_number) DO UPDATE SET title = EXCLUDED.title
         RETURNING id`,
        [courseId, mod.number, mod.title]
      );
      const moduleId = modRes.rows[0].id;

      for (const unit of mod.units) {
        await client.query(
          `INSERT INTO units (module_id, unit_number, title, raw_text, extracted_at)
           VALUES ($1, $2, $3, $4, NOW())
           ON CONFLICT (module_id, unit_number) DO UPDATE
             SET raw_text = EXCLUDED.raw_text, extracted_at = NOW()`,
          [moduleId, unit.number, unit.title, unit.raw_text.trim()]
        );
      }
    }

    await client.query('COMMIT');

    res.status(201).json({
      message: `${courseCode.toUpperCase()} saved successfully!`,
      modules: modules.length,
      units: modules.reduce((acc, m) => acc + m.units.length, 0),
    });

  } catch (err) {
    await client.query('ROLLBACK');
    console.error('DB error:', err.message);
    res.status(500).json({ error: 'Failed to save to database.', detail: err.message });
  } finally {
    client.release();
  }
});

module.exports = router;