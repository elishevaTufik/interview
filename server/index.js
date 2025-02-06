const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors()); // Allow requests from different origins

app.use(express.json()); // Middleware to parse JSON

let items = []; // Sample in-memory data store

// Get all items
app.get('/items', (req, res) => {
    res.json(items);
});

// Get a single item by ID
app.get('/items/:id', (req, res) => {
    const item = items.find(i => i.id === parseInt(req.params.id));
    if (!item) return res.status(404).json({ message: 'Item not found' });
    res.json(item);
});

// Create a new item
app.post('/items', (req, res) => {
    const newItem = {
        id: items.length + 1,
        name: req.body.name
    };
    items.push(newItem);
    res.status(201).json(newItem);
});

// Update an item
app.put('/items/:id', (req, res) => {
    const item = items.find(i => i.id === parseInt(req.params.id));
    if (!item) return res.status(404).json({ message: 'Item not found' });

    item.name = req.body.name;
    res.json(item);
});

// Delete an item
app.delete('/items/:id', (req, res) => {
    const index = items.findIndex(i => i.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ message: 'Item not found' });

    items.splice(index, 1);
    res.status(204).send();
});

// Start server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
