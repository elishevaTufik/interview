import React, { useState } from "react";
import axios from "axios";

const API_BASE_URL = "http://localhost:7072/screen"; // Base URL for API

function App() {
    const [content, setContent] = useState("Click a link to load content");

    // Function to fetch screen content
    const fetchContent = (screenId) => {
        axios.get(`${API_BASE_URL}/${screenId}`)
            .then(response => setContent(response.data.content))
            .catch(error => console.error("Error fetching data:", error));
    };

    return (
        <div style={{ display: "flex", height: "100vh" }}>
            {/* Sidebar */}
            <div style={{ width: "200px", background: "#333", color: "white", padding: "20px" }}>
                <h3>Menu</h3>
                <ul style={{ listStyle: "none", padding: 0 }}>
                    <li><button style={buttonStyle} onClick={() => fetchContent(1)}>Screen 1</button></li>
                    <li><button style={buttonStyle} onClick={() => fetchContent(2)}>Screen 2</button></li>
                    <li><button style={buttonStyle} onClick={() => fetchContent(3)}>Screen 3</button></li>
                </ul>
            </div>

            {/* Content Area */}
            <div style={{ flex: 1, padding: "20px" }}>
                <h2>Content Area</h2>
                <p>{content}</p>
            </div>
        </div>
    );
}

// Styling for buttons
const buttonStyle = {
    width: "100%",
    padding: "10px",
    margin: "5px 0",
    border: "none",
    background: "#555",
    color: "white",
    cursor: "pointer"
};

export default App;
