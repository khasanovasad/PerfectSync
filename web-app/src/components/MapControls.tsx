import React from 'react';
import SearchInput from './SearchInput';
import SuggestionList from './SuggestionsList';

interface MapControlsProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onSearch: () => void;
  suggestions: string[];
  selectSuggestion: (suggestion: string) => void;
}

const MapControls: React.FC<MapControlsProps> = ({
  searchQuery,
  setSearchQuery,
  onSearch,
  suggestions,
  selectSuggestion,
}) => {
  return (
    <div style={{ marginBottom: '10px' }}>
      <SearchInput
        onSearch={onSearch}
        setSearchQuery={setSearchQuery}
        searchQuery={searchQuery}
      />
      <SuggestionList
        suggestions={suggestions}
        selectSuggestion={selectSuggestion}
      />
    </div>
  );
};

export default MapControls;
