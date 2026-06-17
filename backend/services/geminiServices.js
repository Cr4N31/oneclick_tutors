require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function generateSummary(unitTitle, rawText, retries = 3) {
  const model = genAI.getGenerativeModel({
    model: 'gemini-2.5-flash',
    generationConfig: {
      responseMimeType: 'application/json',
      maxOutputTokens: 8192,
    },
  });

  const prompt = `You are an academic study assistant for NOUN (National Open University of Nigeria) students.

Below is the raw content of a study unit titled "${unitTitle}". Generate a structured summary in JSON format with exactly these fields:

- "overview": A clear 3-5 sentence overview of what this unit covers.
- "key_concepts": An array of 5-8 key concepts/topics covered (short phrases).
- "definitions": An array of objects with "term" and "definition" for important terms defined in the unit (5-10 items).
- "keynotes": An array of 5-8 important points/takeaways a student should remember for exams.
- "formulas": An array of objects for any mathematical or scientific formulas found in the unit. Each object should have:
    - "name": the name of the formula or law (e.g. "Stefan-Boltzmann Law")
    - "expression": the formula itself as a readable string (e.g. "P = σeAT⁴")
    - "variables": an array of objects with "symbol" and "meaning" for each variable
    - "example": a worked example using the formula with step-by-step solution, based on examples in the material or a similar one you formulate from it
  If no formulas are present in the unit, return an empty array for this field.

Important instructions:
- For science, physics, chemistry, and mathematics units, pay special attention to formulas, equations, laws, and worked examples in the material.
- When writing worked examples, show each calculation step clearly.
- Base all content strictly on the provided unit material — do not introduce concepts not covered in the text.
- Return ONLY valid JSON, no markdown formatting, no backticks, no extra text.

Return ONLY valid JSON.

UNIT CONTENT:
${rawText.substring(0, 15000)}`;

  for (let attempt = 1; attempt <= retries; attempt++) {
        try {
            const result = await model.generateContent(prompt);
            return JSON.parse(result.response.text());
        } catch (err) {
            if (err.message.includes('503') && attempt < retries) {
                console.log(`Gemini overloaded, retrying (${attempt}/${retries})...`);
                await new Promise(r => setTimeout(r, 2000 * attempt));
            } else {
                throw err;
            }
        }
    }
}

module.exports = { generateSummary };