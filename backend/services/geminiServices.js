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

module.exports = { generateSummary };