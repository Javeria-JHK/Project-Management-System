const colors = {
  black: "bg-black",
  gray: "bg-gray-600",
  default: "bg-[#1a1a1a]",
  lightGray: "bg-gray-400",
};

export default function Button({
  type = "button",
  children,
  onClick,
  bgcolor = "default",
  textColor = "white",
  width = "w-full",
  paddingHorizontal = "px-4",
  paddingVertical = "py-2",
  height,
  isLoading = false,
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isLoading}
      className={`font-semibold ${paddingHorizontal} ${paddingVertical} rounded-lg transition duration-300 flex justify-center items-center 
        hover:ring-1 hover:ring-blue-950 
        ${colors[bgcolor]} 
     
        ${width} ${height} 
        ${textColor === "white" ? "text-white" : "text-black"}`}
    >
      {isLoading === true ? (
        <div className="w-full flex justify-center items-center ">
          <div className="w-5 h-5 border-3 border-gray-700 border-t-white rounded-full animate-spin"></div>
        </div>
      ) : (
        children
      )}
    </button>
  );
}
