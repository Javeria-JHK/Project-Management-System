import { Select, MenuItem } from "@mui/material";
import useTheme from "../../hooks/useTheme";

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
  const { theme } = useTheme();

  const isDark = theme === "dark";
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
                backgroundColor: isDark ? "#363636" : "#eff6ff", // dark: gray-700, light: blue-50
                boxShadow: isDark
                  ? "0 0 0 3px rgba(255,255,255,0.2)"
                  : "0 0 0 3px rgba(37, 99, 235, 0.3)",
              },
            }
          : {
              "&.Mui-focused": {
                backgroundColor: "transparent",
                boxShadow: "none",
              },
            }),
      }}
      MenuProps={{
        PaperProps: {
          sx: {
            backgroundColor: isDark ? "#262626" : "#ffffff", // dark: gray-800, light: white
            color: isDark ? "#f3f4f6" : "#111827", // text-gray-100 vs gray-900
          },
        },
      }}
      className={`${widthx} `}
    >
      {items.map((item) => (
        <MenuItem key={item.value} value={item.value}>
          {item.icon && (
            <span style={{ display: "flex", alignItems: "center" }}>
              {item.icon}
              {item.label}
            </span>
          )}
          <span
            className={`text-sm ${isDark ? "text-gray-100" : "text-gray-600"}`}
          >
            {(!item.icon && item.label) || item.value}
          </span>
        </MenuItem>
      ))}
    </Select>
  );
}

export default SelectMenu;
