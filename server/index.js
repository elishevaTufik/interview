const express = require('express');
const cors = require('cors');

const app = express();
const port = 7072

app.use(cors());
app.use(express.json());

// Search and pagination endpoint
app.get('/screen/1', (req, res) => {
    let { search, page = 1, limit = 20 } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);

    let filteredRecords = records;

    if (search) {
        const lowerSearch = search.toLowerCase();
        filteredRecords = records.filter(record =>
            record.id.toString().includes(lowerSearch) ||
            record.title.toLowerCase().includes(lowerSearch) ||
            record.notes.toLowerCase().includes(lowerSearch)
        );
    }

    // Pagination
    const start = (page - 1) * limit;
    const paginatedRecords = filteredRecords.slice(start, start + limit);

    res.json({
        total: filteredRecords.length,
        page,
        limit,
        results: paginatedRecords
    });
});

app.get('/screen/2', (req, res) => {
    res.json({ content: "This is screen 2" });
});

app.get('/screen/3', (req, res) => {
    res.json({ content: "This is screen 3" });
});


// Sample data (Replace with DB query if needed)
const records = Array.from({ length: 100 }, (_, i) => ({
    id: i + 1,
    title: `Title ${i + 1}`,
    notes: `Notes for item ${i + 1}`
}));



app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

