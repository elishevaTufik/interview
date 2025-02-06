import React, { useState } from "react";
import Screen1 from "./Conponents/Screen1";
import Screen2 from "./Conponents/Screen2";
import Screen3 from "./Conponents/Screen3";

function App() {
    const [currentScreen, setCurrentScreen] = useState("screen1");

    return (
        <div style={{ display: "flex", height: "100vh" }}>
            {/* Sidebar */}
            <div style={{ width: "200px", background: "#333", color: "white", padding: "20px" }}>
                <h3>Menu</h3>
                <ul style={{ listStyle: "none", padding: 0 }}>
                    <li><button style={buttonStyle} onClick={() => setCurrentScreen("screen1")}>Screen 1</button></li>
                    <li><button style={buttonStyle} onClick={() => setCurrentScreen("screen2")}>Screen 2</button></li>
                    <li><button style={buttonStyle} onClick={() => setCurrentScreen("screen3")}>Screen 3</button></li>
                </ul>
            </div>

            {/* Content Area */}
            <div style={{ flex: 1, padding: "20px" }}>
                {currentScreen === "screen1" && <Screen1 />}
                {currentScreen === "screen2" && <Screen2 />}
                {currentScreen === "screen3" && <Screen3 />}
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
