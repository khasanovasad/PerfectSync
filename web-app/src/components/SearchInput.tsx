import React, { MouseEventHandler } from 'react';

interface SearchInputProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onSearch: MouseEventHandler<HTMLButtonElement>;
}

const SearchInput: React.FC<SearchInputProps> = ({
  searchQuery,
  setSearchQuery,
  onSearch,
}) => (
  <div style={{ marginBottom: '10px' }}>
    <input
      type="text"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      placeholder="Enter address..."
      style={{ padding: '10px', width: '300px', marginRight: '10px' }}
    />
    <button onClick={onSearch} style={{ padding: '10px' }}>
      Search
    </button>
  </div>
);

export default SearchInput;
