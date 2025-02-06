import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:3000/screen/3";

function Screen2() {
    const [query, setQuery] = useState("nature");
    const [images, setImages] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    // Fetch images from backend
    const fetchImages = async (query, page) => {
        try {
            const response = await axios.get(API_URL, { params: { query, page, per_page: 10 } });
            setImages(response.data.images);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            console.error("Error fetching images:", error);
        }
    };

    // Handle search
    const handleSearch = () => {
        setPage(1);
        fetchImages(query, 1);
    };

    // Handle enter key submission
    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            handleSearch();
        }
    };

    // Handle pagination
    const handlePageChange = (direction) => {
        const newPage = page + direction;
        if (newPage < 1 || newPage > totalPages) return;
        setPage(newPage);
        fetchImages(query, newPage);
    };

    // Initial fetch on mount
    useEffect(() => {
        fetchImages(query, page);
    }, []);

    return (
        <div style={{ padding: "20px" }}>
            <h2>Screen 2 - Image Search</h2>

            {/* Search Bar */}
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Search for images..."
                style={{ width: "300px", padding: "8px", marginBottom: "10px" }}
            />
            <button onClick={handleSearch}>Search</button>

            {/* Image Gallery */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px", marginTop: "20px" }}>
                {images.map((img) => (
                    <img key={img.id} src={img.url} alt={img.alt} style={{ width: "100%", borderRadius: "5px" }} />
                ))}
            </div>

            {/* Pagination Controls */}
            <div style={{ marginTop: "20px" }}>
                <button onClick={() => handlePageChange(-1)} disabled={page === 1}>Previous</button>
                <span style={{ margin: "0 10px" }}>Page {page} of {totalPages}</span>
                <button onClick={() => handlePageChange(1)} disabled={page >= totalPages}>Next</button>
            </div>
        </div>
    );
}

export default Screen2;
