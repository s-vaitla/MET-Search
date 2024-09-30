import React from 'react';
import SearchResult from './SearchResult';
import './App.css'; 

function App() {
    return (
        <div className="App">
            <h1>The Metropolitan Museum of Art Collection</h1>
            <SearchResult searchDate="2024-09-01" />
        </div>
    );
}

export default App;
