const express = require('express');
const router = express.Router();
const pool = require('../config/db');

router.get('/', async (req, res) => {
  try {
    const courses = await pool.query(
      `SELECT id, code, title FROM courses ORDER BY code`
    );

    const result = [];

    for (const course of courses.rows) {
      const modules = await pool.query(
        `SELECT id, module_number, title FROM modules 
         WHERE course_id = $1 ORDER BY module_number`,
        [course.id]
      );

      const modulesWithUnits = [];

      for (const mod of modules.rows) {
        const units = await pool.query(
          `SELECT id, unit_number, title, extracted_at, length(raw_text) as chars 
           FROM units WHERE module_id = $1 ORDER BY unit_number`,
          [mod.id]
        );
        modulesWithUnits.push({ ...mod, units: units.rows });
      }

      result.push({ ...course, modules: modulesWithUnits });
    }

    res.json(result);
  } catch (err) {
    console.error('Viewer error:', err.message);
    res.status(500).json({ error: 'Failed to fetch data.' });
  }
});

module.exports = router;