const SuggestionList = ({
  suggestions,
  selectSuggestion,
  className,
}: {
  suggestions: any[];
  selectSuggestion: (suggestion: string) => void;
  className: string;
}) => {
  return (
    <div className={className}>
      {suggestions.length > 0 ? (
        suggestions.map((suggestion, index) => (
          <div
            key={index}
            className="p-2 hover:bg-gray-200 cursor-pointer"
            onMouseDown={() => selectSuggestion(suggestion)}
          >
            {suggestion}
          </div>
        ))
      ) : (
        <div className="p-2 text-gray-500">No suggestions found</div>
      )}
    </div>
  );
};

export default SuggestionList;
