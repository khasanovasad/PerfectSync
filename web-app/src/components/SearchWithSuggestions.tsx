import { default as classNames, default as clx } from 'classnames';
import React, { useEffect, useState } from 'react';
import { FiSearch, FiX } from 'react-icons/fi';
import { useAISuggestions } from '../hooks/useAISuggestions';
import SearchInput from './SearchInput';
import SuggestionList from './SuggestionsList';

interface SearchWithSuggestionsProps {
  searchTerm: string;
  suggestions: string[];
  setSearchTerm: (query: string) => void;
  setSuggestions: (suggestion: string) => void;
  handleSearch: () => void;
  coordinates?: [number, number] | null;
  className: string;
}

const SearchWithSuggestions: React.FC<SearchWithSuggestionsProps> = ({
  searchTerm,
  setSearchTerm,
  suggestions,
  handleSearch,
  coordinates,
  className,
}) => {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const { fetchAiDate } = useAISuggestions();

  useEffect(() => {
    if (searchTerm && suggestions) {
      setIsPanelOpen(true);
    } else {
      setIsPanelOpen(false);
    }
  }, [searchTerm, suggestions]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleClear = () => {
    setSearchTerm(''); // Clear the search term
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchTerm(suggestion);
    setIsPanelOpen(false); // Close the panel after selecting a suggestion
    setIsFocused(false); // Remove blur
    handleSearch();
  };

  const handleFocus = () => {
    setIsFocused(true); // Apply blur and overlay when input is focused
  };

  const handleBlur = () => {
    setTimeout(() => {
      setIsFocused(false); // Remove blur effect after short delay
      setIsPanelOpen(false);
    }, 200);
  };

  return (
    <div className={clx('relative w-full max-w-md mx-auto', className)}>
      {/* Smooth transition for blur and opacity */}
      <div
        className={classNames(
          'fixed inset-0 transition-all duration-500 pointer-events-none z-10',
          {
            'bg-gray-200 opacity-60 backdrop-blur-sm': isFocused,
            'opacity-0 backdrop-blur-none': !isFocused,
          }
        )}
      ></div>

      <div className="relative flex items-center z-30">
        {/* Search Input */}
        <SearchInput
          searchTerm={searchTerm}
          handleChange={handleChange}
          handleFocus={handleFocus}
          handleBlur={handleBlur}
          placeholder={'Search'}
        />

        {/* "X" Clear Button (only visible when searchTerm exists) */}
        {searchTerm && (
          <button
            onClick={handleClear}
            className="absolute right-12 bg-primary-blue text-gray-500 hover:text-gray-700 focus:outline-none z-30"
            style={{ height: '40px' }}
          >
            <FiX size={20} className="text-gray-500" />
          </button>
        )}

        {/* Search Button */}
        <button
          onClick={handleSearch}
          className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-r-md focus:outline-none z-40"
          style={{ height: '40px' }} // Same height as the input
        >
          <FiSearch size={20} className="text-white" />
        </button>
      </div>

      {/* Suggestions Panel */}
      {isPanelOpen && (
        <SuggestionList
          className={
            'absolute w-full bg-white border border-gray-300 rounded-md mt-1 max-h-40 overflow-y-auto shadow-lg z-20'
          }
          suggestions={suggestions}
          selectSuggestion={handleSuggestionClick}
        />
      )}
    </div>
  );
};

export default SearchWithSuggestions;
