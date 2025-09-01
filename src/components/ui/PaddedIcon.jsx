import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

const bgColors = {
  gray: "bg-gray-700",
  lightGray: "bg-gray-200",
  blue: "bg-blue-300",
  green: "bg-green-300",
  red: "bg-red-300",
};

const hoverColors = {
  gray: "hover:bg-gray-600",
  lightGray: "hover:bg-gray-300",
  blue: "hover:bg-blue-400",
  green: "hover:bg-green-400",
  red: "hover:bg-red-400",
};

function PaddedIcon({
  Icon = HelpOutlineIcon,
  color = "white",
  bgColor = "gray",
  hoverBg = "gray",
}) {
  return (
    <div
      className={`flex items-center justify-center relative w-7 h-7 cursor-pointer 
        transition-colors duration-200 rounded-md
        ${bgColors[bgColor]} ${hoverColors[hoverBg]}`}
    >
      <Icon sx={{ fontSize: 18, color: color }} />
    </div>
  );
}

export default PaddedIcon;
