import React from 'react';

const SearchResultItem = ({ item }) => {
    const {
        primaryImageSmall,
        title,
        objectDate,
        department,
        artistRole,
        artistDisplayName,
        artistNationality,
        tags
    } = item;

    return (
        <div className="search-result-item">
            <img 
                src={primaryImageSmall || 'https://via.placeholder.com/150'} 
                alt={title || 'Not Available'} 
                className="result-image"
            />
            <h3>{title || 'Not Available'}</h3>
            <p><strong>Date:</strong> {objectDate || 'Not Available'}</p>
            <p><strong>Department:</strong> {department || 'Not Available'}</p>
            <p><strong>Artist Role:</strong> {artistRole || 'Not Available'}</p>
            <p><strong>Artist Name:</strong> {artistDisplayName || 'Not Available'}</p>
            <p><strong>Artist Nationality:</strong> {artistNationality || 'Not Available'}</p>
            {tags && tags.length > 0 && (
                <div>
                    <strong>Tags:</strong>
                    {tags.slice(0, 3).map((tag, index) => (
                        <span key={index}>
                            {tag.term || 'Not Available'}
                            {index < 2 ? ', ' : ''}
                        </span>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SearchResultItem;
