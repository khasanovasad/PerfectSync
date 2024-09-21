import React from 'react';

interface SearchButtonProps {
  onClick: () => void;
}

const SearchButton: React.FC<SearchButtonProps> = ({ onClick }) => (
  <button onClick={onClick} style={{ padding: '10px' }}>
    Search
  </button>
);

export default SearchButton;
