import { useMemo, useState } from "react";
import useFeed from "../context/FeedProvider";
import { debounce } from "lodash";
export const SearchBar = () => {
  const { updateSearch } = useFeed(); // Destructuring updateSearch function from feed context

  const [searchInput, setSearchInput] = useState(""); // State to store user input for search

  // Creating a debounced version of the updateSearch function to avoid triggering it on every keystroke
  const debounceFn = useMemo(() => debounce(updateSearch, 300), []);

  // Event handler to update searchInput state and trigger the debounced updateSearch function
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setSearchInput(inputValue);
    debounceFn(inputValue);
  };

  return (
    // Container for the search input field
    <div className="relative">
      {/* Input field for search with event handler to update searchInput state */}
      <input
        type="text"
        value={searchInput}
        placeholder=""
        onChange={handleChange}
        className="w-60 h-8 rounded-lg p-4 pl-8 border-[3px] border-rigi-500 dark:bg-gray-500 dark:border-rigi-400"
      />
      {/* Search icon positioned inside the input field */}
      <img
        src={"/search_icon.png"}
        alt="Search Icon"
        className="absolute top-1/2 transform -translate-y-1/2 left-2 w-5 h-5 object-contain"
      />
    </div>
  );
};
