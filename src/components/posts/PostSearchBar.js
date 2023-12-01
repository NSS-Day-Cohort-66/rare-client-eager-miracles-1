import { useState } from "react";
import "./PostSearchBar.css";

export const PostSearchBar = ({ handleSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      // Trigger the search when Enter key is pressed
      handleSearch(searchTerm);
    }
  };

  return (
    <div className="filter-bar">
      <input
        onChange={(event) => {
          setSearchTerm(event.target.value);
        }}
        onKeyPress={handleKeyPress}
        type="text"
        placeholder="Search Posts ✨🔎"
        className="ticket-search"
      />
    </div>
  );
};
