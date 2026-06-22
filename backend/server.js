const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const PORT = 3000;
const pool = require('./config/db');
const uploadRoute = require('./routes/upload');
const viewerRoute = require('./routes/viewer');
const authRoute = require('./routes/auth')
const summaryRoute = require('./routes/summary')
const quizRoute = require('./routes/quiz');
const courseStructureRoute = require('./routes/courseStructure');


app.use(cors({
  origin: [
    'http://localhost:5174',
    'http://localhost:5173',
    'https://oneclick-tutors.vercel.app',
  ],
  credentials: true
}));

app.use(express.json());

app.use('/api/upload', uploadRoute);
app.use('/api/viewer', viewerRoute);
app.use('/api/auth', authRoute);
app.use('/api/summary', summaryRoute);
app.use('/api/quiz', quizRoute);
app.use('/api/courses', courseStructureRoute);



app.get("/", (req, res) => {
    res.json({ message: "Backend is running!" });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

async function testDb() {
    console.log('Testing DB connection...');
    try {
        const res = await pool.query('SELECT NOW()');
        console.log('DB connected at:', res.rows[0].now);
    } catch (err) {
        console.error('DB connection failed:', err.message);
    }
}
testDb();