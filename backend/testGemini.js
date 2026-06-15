require('dotenv').config();
const { generateSummary } = require('./services/geminiServices');

(async () => {
  const result = await generateSummary('Test Unit', 'Communication is the process of sending and receiving messages. It involves a sender, a message, a channel, and a receiver. Effective communication requires clarity, feedback, and an appropriate medium.');
  console.log(JSON.stringify(result, null, 2));
})();