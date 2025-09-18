import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import SelectMenu from "./Select";

function SearchBar({
  searchQuery,
  setSearchQuery,
  searchFilter,
  setSearchFilter,
  filters,
  rounded,
  border,
}) {
  return (
    <div
      className={`flex items-center bg-gray-50 ${
        rounded
          ? "rounded-3xl shadow-sm shadow-gray-500 focus-within:ring-1 "
          : "rounded-lg"
      } ${border && "border-1 border-gray-700 "} h-10 pl-2 w-80 `}
    >
      <SearchIcon className="text-gray-700" />

      {filters && (
        <SelectMenu
          value={searchFilter}
          onChange={(e) => setSearchFilter(e.target.value)}
          items={filters}
        />
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
