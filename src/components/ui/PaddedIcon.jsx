import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

const bgColors = {
  gray: "bg-gray-700 ",
  lightGray: "bg-gray-200 dark:bg-[#151515]",
  blue: "bg-blue-300 dark:bg-blue-950",
  green: "bg-green-300",
  red: "bg-red-300",
  white: "bg-gray-300",
};

const hoverColors = {
  gray: "hover:bg-gray-600 dark:hover:bg-gray-400",
  lightGray: "hover:bg-gray-300 dark:hover:bg-gray-900",
  blue: "hover:bg-blue-400 dark:hover:bg-blue-200",
  green: "hover:bg-green-400 dark:hover:bg-green-200",
  red: "hover:bg-red-400 dark:hover:bg-red-200",
  white: "hover:bg-gray-100 dark:hover:bg-gray-200",
};

function PaddedIcon({ Icon = HelpOutlineIcon, color, bgColor, hoverBg }) {
  const iconColor = color || "text-black dark:text-white";
  return (
    <div
      className={`flex items-center justify-center relative w-7 h-7 cursor-pointer 
        transition-colors duration-200 rounded-md
        ${bgColors[bgColor] || ""} ${hoverColors[hoverBg] || ""}`}
    >
      <Icon
        className={`${iconColor} dark:hover:text-gray-400`}
        sx={{ fontSize: 18 }}
      />
    </div>
  );
}

export default PaddedIcon;
