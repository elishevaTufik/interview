const express = require('express');
const cors = require('cors');

const app = express();
const port = 7072

app.use(cors());
app.use(express.json());


const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY; // Store API key in .env

// Initial grid state (random red or blue)
let grid = Array.from({ length: 3 }, () =>
    Array.from({ length: 3 }, () => (Math.random() < 0.5 ? "red" : "blue"))
);

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

// API to get initial grid state
app.get("/screen/3/grid", (req, res) => {
    res.json({ grid });
});

// API to update grid when a square is clicked
app.post("/screen/3/grid", (req, res) => {
    const { row, col } = req.body;

    if (row < 0 || row >= 3 || col < 0 || col >= 3) {
        return res.status(400).json({ message: "Invalid grid coordinates" });
    }

    const clickedColor = grid[row][col];
    const newColor = clickedColor === "red" ? "blue" : "red";

    // Function to toggle a cell's color
    const toggleCell = (r, c) => {
        if (r >= 0 && r < 3 && c >= 0 && c < 3) {
            grid[r][c] = newColor;
        }
    };

    // Toggle the clicked cell
    toggleCell(row, col);

    // Toggle adjacent cells with the opposite color
    if (row > 0 && grid[row - 1][col] !== clickedColor) toggleCell(row - 1, col);
    if (row < 2 && grid[row + 1][col] !== clickedColor) toggleCell(row + 1, col);
    if (col > 0 && grid[row][col - 1] !== clickedColor) toggleCell(row, col - 1);
    if (col < 2 && grid[row][col + 1] !== clickedColor) toggleCell(row, col + 1);

    res.json({ grid });
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

