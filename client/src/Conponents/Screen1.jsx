import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import _ from "lodash";

const API_URL = "http://localhost:3000/screen/1";

function Screen1() {
    const [records, setRecords] = useState([]);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [totalRecords, setTotalRecords] = useState(0);
    const limit = 20; // Number of records per page

    // Fetch records from backend
    const fetchRecords = async (searchQuery = "", pageNumber = 1) => {
        try {
            const response = await axios.get(API_URL, {
                params: { search: searchQuery, page: pageNumber, limit }
            });
            setRecords(response.data.results);
            setTotalRecords(response.data.total);
        } catch (error) {
            console.error("Error fetching records:", error);
        }
    };

    // Debounce function (waits 300ms after last key press)
    const debouncedSearch = useCallback(_.debounce((query) => {
        fetchRecords(query, 1);
    }, 300), []);

    // Handle search input changes
    const handleSearchChange = (event) => {
        const value = event.target.value;
        setSearch(value);
        setPage(1);

        if (value === "") {
            fetchRecords("", 1); // Reset results when input is cleared
        } else {
            debouncedSearch(value);
        }
    };

    // Handle Enter key submission
    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            debouncedSearch.cancel(); // Cancel debounce to avoid duplicate call
            fetchRecords(search, 1);
        }
    };

    // Handle page change
    const handlePageChange = (newPage) => {
        if (newPage < 1 || newPage > Math.ceil(totalRecords / limit)) return;
        setPage(newPage);
        fetchRecords(search, newPage);
    };

    // Initial fetch on mount
    useEffect(() => {
        fetchRecords("", 1);
    }, []);

    return (
        <div style={{ padding: "20px" }}>
            <h2>Screen 1 - Search and Paginate</h2>

            {/* Search Bar */}
            <input
                type="text"
                value={search}
                onChange={handleSearchChange}
                onKeyPress={handleKeyPress}
                placeholder="Search by ID, Title, or Notes..."
                style={{ width: "300px", padding: "8px", marginBottom: "10px" }}
            />

            {/* Results List */}
            <ul>
                {records.map((record) => (
                    <li key={record.id}>
                        <strong>{record.title}</strong> - {record.notes}
                    </li>
                ))}
            </ul>

            {/* Pagination Controls */}
            <div>
                <button onClick={() => handlePageChange(page - 1)} disabled={page === 1}>Previous</button>
                <span style={{ margin: "0 10px" }}>Page {page}</span>
                <button onClick={() => handlePageChange(page + 1)} disabled={page * limit >= totalRecords}>Next</button>
            </div>
        </div>
    );
}

export default Screen1;
