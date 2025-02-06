const express = require('express');
const cors = require('cors');

const app = express();
const port = 7072

app.use(cors());
app.use(express.json());


const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY; // Store API key in .env

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


// Unsplash search endpoint
app.get('/screen/2', async (req, res) => {
    const { query = "nature", page = 1, per_page = 10 } = req.query;

    try {
        const response = await axios.get(`https://api.unsplash.com/search/photos`, {
            params: { query, page, per_page },
            headers: {
                Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`
            }
        });

        res.json({
            total: response.data.total,
            totalPages: response.data.total_pages,
            images: response.data.results.map(img => ({
                id: img.id,
                url: img.urls.regular,
                alt: img.alt_description
            }))
        });

    } catch (error) {
        res.status(500).json({ message: "Error fetching images", error: error.message });
    }
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

