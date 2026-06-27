const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const { generateQuiz } = require('../services/geminiServices');


router.post('/attempt', async(req, res) => {
  const { student_id, unit_id, module_id, course_id, difficulty, score, total, answers, scope } = req.body;

  try {
    await pool.query(
      `INSERT INTO quiz_attempts (student_id, unit_id, module_id, course_id, difficulty, score, total, answers, scope)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
      [student_id, unit_id, module_id, course_id, difficulty, score, total, JSON.stringify(answers), scope || 'unit']
    );

    res.status(201).json({ message: 'Attempt saved'});
  } catch(err){
    console.error('Attempt save error:', err.message);
    res.status(500).json({ error: 'Failed to save attempt'})
  }
});


// GET /api/quiz/:unitId?difficulty=beginner
router.get('/:unitId', async (req, res) => {
  const { unitId } = req.params;
  const difficulty = req.query.difficulty || 'beginner';

  try {
    // 1. Check cache
    const existing = await pool.query(
      `SELECT id, question, options, correct_answer, explanation
       FROM questions 
       WHERE unit_id = $1 AND difficulty = $2`,
      [unitId, difficulty]
    );

    if (existing.rows.length >= 10) {
      // Shuffle and return 10
      const shuffled = existing.rows.sort(() => Math.random() - 0.5).slice(0, 10);
      return res.json({ cached: true, questions: shuffled });
    }

    // 2. Fetch unit content
    const unitRes = await pool.query(
      `SELECT units.title, units.raw_text, modules.module_number, courses.code
       FROM units
       JOIN modules ON units.module_id = modules.id
       JOIN courses ON modules.course_id = courses.id
       WHERE units.id = $1`,
      [unitId]
    );

    if (unitRes.rows.length === 0) {
      return res.status(404).json({ error: 'Unit not found.' });
    }

    const { title, raw_text, module_number, code } = unitRes.rows[0];

    // 3. Generate with Gemini
    const questions = await generateQuiz(title, raw_text, difficulty);

    // 4. Get course_id and module_id for caching
    const metaRes = await pool.query(
      `SELECT modules.id as module_id, modules.course_id
       FROM units
       JOIN modules ON units.module_id = modules.id
       WHERE units.id = $1`,
      [unitId]
    );
    const { module_id, course_id } = metaRes.rows[0];

    // 5. Cache questions
    for (const q of questions) {
      await pool.query(
        `INSERT INTO questions (course_id, module_id, unit_id, question, options, correct_answer, explanation, difficulty)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
        [course_id, module_id, unitId, q.question, JSON.stringify(q.options), q.correct_answer, q.explanation, difficulty]
      );
    }

    res.json({ cached: false, questions });

  } catch (err) {
    console.error('Quiz error:', err.message);
    res.status(500).json({ error: 'Failed to generate quiz.', detail: err.message });
  }
});

module.exports = router;