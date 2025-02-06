const express = require('express');
const cors = require('cors');

const app = express();
const port = 7072

app.use(cors());
app.use(express.json());

// API endpoints for screens
app.get('/screen/1', (req, res) => {
    res.json({ content: "This is screen 1" });
});

app.get('/screen/2', (req, res) => {
    res.json({ content: "This is screen 2" });
});

app.get('/screen/3', (req, res) => {
    res.json({ content: "This is screen 3" });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
