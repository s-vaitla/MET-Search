import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchResultItem from './SearchResultItem';

const SearchResult = ({ searchDate }) => {
    const [items, setItems] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSearchResults = async () => {
            try {
                const response = await axios.get(
                    `https://collectionapi.metmuseum.org/public/collection/v1/objects?metadataDate=${searchDate}`
                );
                const objectIds = response.data.objectIDs.slice(0, 20); // Limit the number of results for demo
                const detailedResults = await Promise.all(
                    objectIds.map(id =>
                        axios.get(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`).then(res => res.data)
                    )
                );

                setItems(detailedResults);
                setFilteredItems(detailedResults);

                const departmentsData = detailedResults.reduce((acc, item) => {
                    if (item.department) {
                        acc[item.department] = (acc[item.department] || 0) + 1;
                    }
                    return acc;
                }, {});
                setDepartments(Object.entries(departmentsData).sort((a, b) => b[1] - a[1]).slice(0, 3));

                setLoading(false);
            } catch (err) {
                setError('Error fetching data');
                setLoading(false);
            }
        };

        fetchSearchResults();
    }, [searchDate]);

    const handleFilter = (department) => {
        if (department) {
            setFilteredItems(items.filter(item => item.department === department));
        } else {
            setFilteredItems(items);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="search-result">
            <h2>Search Results ({filteredItems.length})</h2>
            {departments.length > 0 && (
                <div className="department-filter">
                    <p>Top Departments:</p>
                    {departments.map(([department], index) => (
                        <button key={index} onClick={() => handleFilter(department)}>
                            {department}
                        </button>
                    ))}
                    <button className="clear" onClick={() => handleFilter(null)}>Clear Filter</button>
                </div>
            )}
            <div className="search-results-list">
                {filteredItems.map((item, index) => (
                    <SearchResultItem key={index} item={item} />
                ))}
            </div>
        </div>
    );
};

export default SearchResult;
