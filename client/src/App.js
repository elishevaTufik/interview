import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:3000/items"; // URL of your Express server

function App() {
    const [items, setItems] = useState([]);
    const [newItem, setNewItem] = useState("");

    // Fetch items from the API
    useEffect(() => {
        axios.get(API_URL)
            .then(response => setItems(response.data))
            .catch(error => console.error("Error fetching data:", error));
    }, []);

    // Handle adding a new item
    const addItem = () => {
        if (!newItem) return;
        
        axios.post(API_URL, { name: newItem })
            .then(response => {
                setItems([...items, response.data]); // Update state with new item
                setNewItem(""); // Clear input
            })
            .catch(error => console.error("Error adding item:", error));
    };

    // Handle deleting an item
    const deleteItem = (id) => {
        axios.delete(`${API_URL}/${id}`)
            .then(() => {
                setItems(items.filter(item => item.id !== id)); // Remove from state
            })
            .catch(error => console.error("Error deleting item:", error));
    };

    return (
        <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
            <h1>Item List</h1>

            {/* Input and Add Button */}
            <div>
                <input
                    type="text"
                    value={newItem}
                    onChange={(e) => setNewItem(e.target.value)}
                    placeholder="Enter item name"
                />
                <button onClick={addItem}>Add Item</button>
            </div>

            {/* List of Items */}
            <ul>
                {items.map(item => (
                    <li key={item.id}>
                        {item.name}
                        <button onClick={() => deleteItem(item.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;
