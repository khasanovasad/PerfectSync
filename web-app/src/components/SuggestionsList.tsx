const SuggestionList = ({
  suggestions,
  selectSuggestion,
}: {
  suggestions: any[];
  selectSuggestion: (suggestion: string) => void;
}) => {
  return (
    suggestions.length > 0 && (
      <ul
        style={{
          border: '1px solid #ccc',
          padding: 0,
          margin: 0,
          listStyle: 'none',
          maxHeight: '150px',
          overflowY: 'auto',
        }}
      >
        {suggestions.map((suggestion, index) => (
          <li
            key={index}
            onClick={() => selectSuggestion(suggestion)}
            style={{ padding: '10px', cursor: 'pointer' }}
          >
            {suggestion}
          </li>
        ))}
      </ul>
    )
  );
};

export default SuggestionList;
