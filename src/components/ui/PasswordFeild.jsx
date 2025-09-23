import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import React, { useState } from "react";

function PasswordFeild({
  label,
  type,
  id,
  error,
  placeholder,
  value,
  onChange,
  required = false,
}) {
  const [Visibility, SetVisibility] = useState(false);
  return (
    <div className="mb-4">
      <label className="block text-gray-700 font-semibold mb-2">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className=" flex w-full px-3 py-2 border border-gray-300 rounded-lg  focus-within:ring-1 focus-within:ring-gray-700 ">
        <input
          type={Visibility ? "text" : type}
          value={value}
          onChange={onChange}
          id={id}
          className={`w-full focus:outline-none   ${
            error
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:ring-gray-700"
          }`}
          placeholder={placeholder}
        />
        {Visibility ? (
          <VisibilityOffIcon
            sx={{ color: "#828282" }}
            onClick={() => {
              SetVisibility(!Visibility);
            }}
          />
        ) : (
          <VisibilityIcon
            sx={{ color: "#828282" }}
            onClick={() => {
              SetVisibility(!Visibility);
            }}
          />
        )}
      </div>
      {/* Error message */}
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}

export default PasswordFeild;
