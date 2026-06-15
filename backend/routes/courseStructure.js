const express = require('express');
const router = express.Router();
const pool = require('../config/db')

router.get('/:code/structure', async (req, res) => {
    const code = req.params.code.toUpperCase().replace(/\s+/g, '');
    try {
        const courseRes = await pool.query(
        `SELECT id, code, title FROM courses WHERE UPPER(REPLACE(code, ' ', '')) = $1`,
        [code]
        );

        if(courseRes.rows.length === 0){
            return res.status(404).json({ error: 'Course not found.' });
        }

        const course = courseRes.rows[0];

        const modules = await pool.query(
            `SELECT id, module_number, title FROM modules
            WHERE course_id = $1 ORDER BY module_number`,
            [course.id]
        );

        const modulesWithUnits = [];

        for(const mod of modules.rows){
            const units = await pool.query(
                `SELECT id, unit_number, title FROM units
                WHERE module_id = $1 ORDER BY unit_number`,
                [mod.id]
            );
            modulesWithUnits.push({ ...mod, units: units.rows });
        }

        res.json({ ...course, modules: modulesWithUnits });
    } catch (err){
        console.error('Course structure error:', err.message);
        res.status(500).json({ error: 'Failed to fetch course structure.'});
    }
});

module.exports = router;