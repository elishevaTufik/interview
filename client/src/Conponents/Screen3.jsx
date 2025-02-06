import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:3000/screen/3/grid";

function Screen3() {
    const [grid, setGrid] = useState([["", "", ""], ["", "", ""], ["", "", ""]]);

    // Fetch grid state from backend
    const fetchGrid = async () => {
        try {
            const response = await axios.get(API_URL);
            setGrid(response.data.grid);
        } catch (error) {
            console.error("Error fetching grid:", error);
        }
    };

    // Handle click event
    const handleCellClick = async (row, col) => {
        try {
            const response = await axios.post(API_URL, { row, col });
            setGrid(response.data.grid);
        } catch (error) {
            console.error("Error updating grid:", error);
        }
    };

    // Fetch grid on component mount
    useEffect(() => {
        fetchGrid();
    }, []);

    return (
        <div style={{ padding: "20px" }}>
            <h2>Screen 3 - Grid Interaction</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 100px)", gap: "5px" }}>
                {grid.map((row, rowIndex) =>
                    row.map((color, colIndex) => (
                        <div
                            key={`${rowIndex}-${colIndex}`}
                            onClick={() => handleCellClick(rowIndex, colIndex)}
                            style={{
                                width: "100px",
                                height: "100px",
                                backgroundColor: color,
                                border: "1px solid black",
                                cursor: "pointer"
                            }}
                        />
                    ))
                )}
            </div>
        </div>
    );
}

export default Screen3;
