import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";

function SearchBar({
  searchQuery,
  setSearchQuery,
  searchFilter,
  setSearchFilter,
  filters,
}) {
  return (
    <div className="flex items-center bg-gray-50 rounded-3xl h-10 pl-2 w-80 focus-within:ring-1 shadow-sm shadow-gray-500 my-2">
      <SearchIcon className="text-gray-700" />
      {filters && <FilterListIcon className="text-gray-700" />}
      {filters && (
        <select
          value={searchFilter}
          onChange={(e) => setSearchFilter(e.target.value)}
          className="
            appearance-none bg-transparent 
            focus:outline-none border-none 
            text-gray-500 text-sm font-medium
            px-2 cursor-pointer
          "
        >
          {filters.map((f) => (
            <option
              key={f}
              value={f}
              className="bg-white focus:bg-gray-700 text-gray-800 font-medium hover:bg-gray-100 px-2 rounded-sm"
            >
              By {f.charAt(0).toUpperCase() + f.slice(1)}:
            </option>
          ))}
        </select>
      )}

      <input
        type="text"
        placeholder={filters ? "..." : "Search..."}
        value={searchQuery}
        className=" focus:outline-none  rounded-2xl w-full h-full p-2 text-gray-800"
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      {/* Dropdown for filter */}
    </div>
  );
}

export default SearchBar;
