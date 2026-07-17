// backend/utils/classifyComplaint.js
//
// Calls the Gemini API (free tier) to auto-categorize and prioritize a
// hostel complaint. Requires: npm install @google/genai
// backend/.env: GEMINI_API_KEY=AIza...

const { GoogleGenAI, Type } = require('@google/genai');

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const VALID_CATEGORIES = ['Electrical', 'Plumbing', 'Security', 'Mess', 'Internet', 'Cleanliness', 'Furniture', 'Other'];
const VALID_PRIORITIES = ['Low', 'Medium', 'High', 'Urgent'];

/**
 * Classifies a complaint message into a category + priority using Gemini.
 * Falls back to safe defaults if the API call fails, so complaint
 * creation never breaks because of the AI step.
 *
 * @param {string} message - the complaint text submitted by the student
 * @returns {Promise<{ category: string, priority: string, reasoning: string }>}
 */
async function classifyComplaint(message) {
  const fallback = { category: 'Other', priority: 'Medium', reasoning: 'AI classification unavailable — default applied.' };

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3.1-flash-lite', // free-tier model, ideal for short classification tasks
      contents: `You are a triage assistant for a college hostel complaint system.
Classify the complaint below into exactly one category and one priority.

Categories: ${VALID_CATEGORIES.join(', ')}
Priorities:
- Urgent: safety/security risk, fire, medical, no water/power for entire block
- High: broken lock, no internet for many students, major plumbing leak
- Medium: single-room issue, furniture damage, minor repairs
- Low: cosmetic issues, general suggestions

Complaint: ${message}`,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            category: { type: Type.STRING, enum: VALID_CATEGORIES },
            priority: { type: Type.STRING, enum: VALID_PRIORITIES },
            reasoning: { type: Type.STRING, description: 'One short sentence explaining the classification.' },
          },
          required: ['category', 'priority', 'reasoning'],
        },
      },
    });

    const parsed = JSON.parse(response.text);

    if (!VALID_CATEGORIES.includes(parsed.category)) parsed.category = 'Other';
    if (!VALID_PRIORITIES.includes(parsed.priority)) parsed.priority = 'Medium';

    return parsed;
  } catch (err) {
    console.error('classifyComplaint failed, using fallback:', err.message);
    return fallback;
  }
}

module.exports = { classifyComplaint, VALID_CATEGORIES, VALID_PRIORITIES };
