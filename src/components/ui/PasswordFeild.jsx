import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import React, { useState } from "react";

function PasswordFeild({ label, type, id, placeholder, value, onChange }) {
  const [Visibility, SetVisibility] = useState(false);
  return (
    <div className="mb-4">
      <label className="block text-gray-700 font-semibold mb-2">{label}</label>
      <div className=" flex w-full px-3 py-2 border border-gray-300 rounded-lg  focus-within:ring-1 focus-within:ring-gray-700 ">
        <input
          type={Visibility ? "text" : type}
          value={value}
          onChange={onChange}
          id={id}
          className="w-full focus:outline-none"
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
    </div>
  );
}

export default PasswordFeild;
