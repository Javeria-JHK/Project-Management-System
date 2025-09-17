import { useState } from "react";

function DropdownSearch({ items, onSelect, placeholder = "Search..." }) {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);

  // Filter items based on query
  const filteredItems = items.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="relative w-full">
      {/* Search Input */}
      <input
        type="text"
        placeholder={placeholder}
        value={search}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />

      {/* Dropdown */}
      {open && search && (
        <div className="absolute top-full left-0 w-full bg-white border border-gray-400 rounded-xl shadow mt-1 max-h-40 overflow-y-auto z-10">
          {filteredItems.length ? (
            filteredItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-3 p-2 cursor-pointer hover:bg-gray-100"
                onClick={() => {
                  onSelect(item);
                  setSearch(item.name);
                  setOpen(false);
                }}
              >
                <p className="w-8 h-8 rounded-full border-1 bg-black/80 text-white font-bold  flex justify-center items-center">
                  {item.name[0].toUpperCase()}
                </p>

                <div>
                  <p className="text-sm font-medium">{item.name}</p>
                  {item.email && (
                    <p className="text-xs text-gray-500">{item.email}</p>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p className="p-2 text-sm text-gray-500">No results found</p>
          )}
        </div>
      )}
    </div>
  );
}

export default DropdownSearch;
