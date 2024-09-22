import clx from 'classnames';
import React, { ChangeEventHandler } from 'react';
interface SearchInputProps {
  searchTerm: string;
  handleChange: ChangeEventHandler<HTMLInputElement>;
  handleFocus: () => void;
  handleBlur: () => void;
  placeholder: string;
  className?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({
  className,
  handleChange,
  handleFocus,
  handleBlur,
  placeholder,
  searchTerm,
}) => (
  <input
    type="text"
    value={searchTerm}
    onChange={handleChange}
    onFocus={handleFocus}
    onBlur={handleBlur}
    placeholder={placeholder}
    className={clx(
      'w-full p-2 pr-10 border border-gray-300 rounded-l-md z-10',
      className
    )} // Rounded only on the left side
    style={{ height: '40px' }} // Same height as the search button
  />
);

export default SearchInput;
