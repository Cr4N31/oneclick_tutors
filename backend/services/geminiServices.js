require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function generateSummary(unitTitle, rawText, retries = 3) {
  const model = genAI.getGenerativeModel({
    model: 'gemini-2.5-flash-lite',
    generationConfig: {
      responseMimeType: 'application/json',
      maxOutputTokens: 8192,
    },
  });

    const prompt = `You are a study assistant for NOUN students. Summarize this unit titled "${unitTitle}" as JSON with these exact fields:

    "overview": 2-3 sentences on what the unit covers.
    "key_concepts": array of 5-6 short concept phrases.
    "definitions": array of 5-8 objects with "term" and "definition".
    "keynotes": array of 5-6 exam-relevant takeaways.
    "formulas": array of formula objects (empty array if none). Each formula object has:
    "name": formula/law name
    "expression": formula as plain text e.g. "F = ma"
    "variables": array of objects with "symbol" and "meaning"
    "example": one short worked example with steps

    Rules: Base everything strictly on the unit content. Return ONLY valid JSON. No markdown, no backticks.

    UNIT CONTENT:
    ${rawText.substring(0, 10000)}`;

  for (let attempt = 1; attempt <= retries; attempt++) {
        try {
            const result = await model.generateContent(prompt);
            return JSON.parse(result.response.text());
        } catch (err) {
            const is503 = err.message.includes('503');
            const is429 = err.message.includes('429');
            
            if (is429) throw err; // Don't retry rate limits
            if (is503 && attempt < retries) {
            console.log(`Gemini overloaded, retrying (${attempt}/${retries})...`);
            await new Promise(r => setTimeout(r, 2000 * attempt));
            } else {
            throw err;
            }
        }
    }
}

async function generateQuiz(unitTitle, rawText, difficulty) {
  const model = genAI.getGenerativeModel({
    model: 'gemini-2.5-flash-lite',
    generationConfig: {
      responseMimeType: 'application/json',
      maxOutputTokens: 4096,
    }
  });

  const difficultyGuide = {
    beginner: `Straightforward recall questions based directly on definitions, basic facts, and key terms in the text. 
If formulas are present, ask students to identify what a variable means or state what a law/formula is called.`,
    intermediate: `Questions requiring understanding and application of concepts. 
If formulas are present, generate calculation-based questions where students must apply the formula to solve a problem using values similar to examples in the text. Show what values are given and ask for the unknown.`,
    pro: `Challenging questions requiring deep analysis, inference, and multi-step reasoning. 
If formulas are present, generate complex calculation questions that combine multiple formulas or require unit conversions before solving. Questions should mirror the difficulty of NOUN exam standard problems.`
  };

  const prompt = `Generate 10 multiple choice questions for NOUN students on this unit: "${unitTitle}".

Difficulty: ${difficulty} — ${difficultyGuide[difficulty]}

Important:
- Scan the content for any mathematical or scientific formulas, equations, or laws.
- For beginner: at least 1-2 questions should test knowledge of formula names or variable meanings if formulas exist.
- For intermediate: at least 4-5 questions must be calculation-based if formulas exist. Present a problem with given values and ask for the answer.
- For pro: at least 6-7 questions must be formula-based, multi-step calculations if formulas exist.
- For non-science units with no formulas, focus on conceptual understanding and application.
- All questions must be based strictly on the provided content.

Return a JSON array of exactly 10 objects. Each object must have:
"question": the question text (include given values for calculation questions)
"options": object with keys "A", "B", "C", "D" as the four answer choices (include units for numerical answers)
"correct_answer": one of "A", "B", "C", or "D"
"explanation": brief explanation showing the calculation steps if applicable

UNIT CONTENT:
${rawText.substring(0, 8000)}`;

  const result = await model.generateContent(prompt);
  const questions = JSON.parse(result.response.text());

  if (!Array.isArray(questions) || questions.length === 0) {
    throw new Error('Invalid quiz response from AI');
  }

  return questions;
}

module.exports = { generateSummary, generateQuiz };