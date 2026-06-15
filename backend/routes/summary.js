const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const { generateSummary } = require('../services/geminiServices')

router.get('/:unitId', async (req, res) => {
    const { unitId } = req.params;

    try {
        // Checks if unit exists
        const existing = await pool.query(
            `SELECT overview, key_concepts, definitions, keynotes
             FROM summaries WHERE unit_id = $1`,
             [unitId]
        );

        if(existing.rows.length > 0) {
            return res.json({ cached: true, summary: existing.rows[0] });
        }

        // fetches the unit's raw_text and title

        const unitRes = await pool.query(
            `SELECT title, raw_text FROM units WHERE id = $1`,
            [unitId]
        );

        if (unitRes.rows.length === 0){
            return res.status(404).json({ error: 'Unit not found'})
        }

        const { title, raw_text } = unitRes.rows[0];

        if(!raw_text || raw_text.trim().length === 0){
            return res.status(422).json({ error: 'This unit has no content to summarise'})
        }

        const summary = await generateSummary(title, raw_text);

        await pool.query(
            `INSERT INTO summaries (unit_id, overview, key_concepts, definitions, keynotes)
            VALUES ($1, $2, $3, $4, $5)`,
            [
                unitId,
                summary.overview,
                JSON.stringify(summary.key_concepts),
                JSON.stringify(summary.definitions),
                JSON.stringify(summary.keynotes),
            ]
        );
        res.json({ cached: false, summary })
    } catch (err){
        console.error('Summary error:', err.message);
        res.status(500).json({ error: 'Failed to generate summary.', detail: err.message });
    }
})

module.exports = router;