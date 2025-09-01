import SearchIcon from "@mui/icons-material/Search";

function SearchBar({ handleSearch }) {
  return (
    <div className="flex items-center bg-gray-50 rounded-3xl h-10 pl-2 w-80 focus-within:ring-1 shadow-sm shadow-gray-500 my-2">
      <SearchIcon className="text-gray-700" />
      <input
        type="text"
        placeholder="Search..."
        className=" focus:outline-none  rounded-2xl w-full h-full p-2 text-gray-800"
        onChange={handleSearch}
      />
    </div>
  );
}

export default SearchBar;
