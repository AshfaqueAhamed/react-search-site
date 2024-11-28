import React, { useState } from 'react';
import Fuse from 'fuse.js';

const App = () => {
  // Dummy dataset
  const data = [
    { id: 1, title: "React Basics", description: "Learn the basics of React.js." },
    { id: 2, title: "Understanding Fuse.js", description: "A guide to using Fuse.js for search functionality." },
    { id: 3, title: "Advanced React", description: "Explore advanced concepts in React." },
    { id: 4, title: "JavaScript Essentials", description: "Core concepts of JavaScript for beginners." },
    { id: 5, title: "UI/UX Design Principles", description: "Learn the principles of great design." },
  ];

  // Search state
  const [query, setQuery] = useState("");
  const [results, setResults] = useState(data);

  // Configure Fuse.js
  const fuse = new Fuse(data, {
    keys: ["title", "description"], // Fields to search in
    threshold: 0.3, // Adjust sensitivity (0 = exact match, 1 = very broad)
  });

  // Handle search
  const handleSearch = (e) => {
    const input = e.target.value;
    setQuery(input);

    if (input.trim() === "") {
      setResults(data); // Reset to full dataset
    } else {
      const result = fuse.search(input).map((item) => item.item); // Extract matched items
      setResults(result);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Search Engine</h1>
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={handleSearch}
        style={{
          padding: "10px",
          width: "100%",
          maxWidth: "400px",
          marginBottom: "20px",
          fontSize: "16px",
        }}
      />
      <div>
        {results.length > 0 ? (
          results.map((item) => (
            <div key={item.id} style={{ marginBottom: "15px", padding: "10px", border: "1px solid #ddd" }}>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          ))
        ) : (
          <p>No results found.</p>
        )}
      </div>
    </div>
  );
};

export default App;
