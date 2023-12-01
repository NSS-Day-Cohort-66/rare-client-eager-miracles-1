export const PostSearchBar = ({ setSearchTerm }) => {
  return (
    <div className="filter-bar">
      <input
        onChange={(event) => {
          setSearchTerm(event.target.value);
        }}
        type="text"
        placeholder="Search Tickets"
        className="ticket-search"
      />
    </div>
  );
};
