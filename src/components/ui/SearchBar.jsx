import SearchIcon from "@mui/icons-material/Search";

function SearchBar() {
  return (
    <div className="flex items-center bg-gray-600 rounded-2xl h-10 pl-2 w-80 focus-within:ring-1 shadow-md shadow-gray-900">
      <SearchIcon className="text-gray-300" />
      <input
        type="text"
        placeholder="Search..."
        className=" focus:outline-none  rounded-2xl w-full h-full p-2 text-white"
      />
    </div>
  );
}

export default SearchBar;
