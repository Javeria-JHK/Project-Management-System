import { Height } from "@mui/icons-material";
import { Select, MenuItem } from "@mui/material";

function SelectMenu({
  value,
  onChange,
  items,
  color = "text-white",
  focusedVariant = false,
  widthx,
  header = false,
  height,
  onBlur,
}) {
  return (
    <Select
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      displayEmpty
      size="small"
      {...(header && {
        renderValue: (selected) => {
          const selectedItem = items.find((i) => i.value === selected);
          return (
            <span className={` ${color} font-bold text-lg`}>
              {selectedItem?.label || selected}
            </span>
          );
        },
      })}
      sx={{
        width: { widthx },
        height: { height },
        "& .MuiOutlinedInput-notchedOutline": {
          border: "none",
        },
        "&:hover .MuiOutlinedInput-notchedOutline": {
          border: "none",
        },
        "& .MuiSelect-icon": {
          color: header ? (color === "text-white" ? "white" : "gray") : "gray",
        },
        ...(focusedVariant
          ? {
              "&.Mui-focused": {
                backgroundColor: "#eff6ff",
                boxShadow: "0 0 0 3px rgba(37, 99, 235, 0.3)",
              },
            }
          : {
              "&.Mui-focused": {
                backgroundColor: "transparent",
                boxShadow: "none",
              },
            }),
      }}
      className={`${widthx} ${Height} `}
    >
      {items.map((item) => (
        <MenuItem key={item.value} value={item.value}>
          {item.icon && (
            <span style={{ display: "flex", alignItems: "center" }}>
              {item.icon}
              {item.label}
            </span>
          )}
          <span className=" text-sm text-gray-600">
            {(!item.icon && item.label) || item.value}
          </span>
        </MenuItem>
      ))}
    </Select>
  );
}

export default SelectMenu;
