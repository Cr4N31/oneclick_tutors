const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;
const pool = require('./config/db');
const uploadRoute = require('./routes/upload');
const viewerRoute = require('./routes/viewer');


app.use(cors());
app.use(express.json());

app.use('/api/upload', uploadRoute);
app.use('/api/viewer', viewerRoute);



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