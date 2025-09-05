const colors = {
  black: "bg-black",
  gray: "bg-gray-600",
  default: "bg-[#1a1a1a]",
};

export default function Button({
  type = "button",
  children,
  onClick,
  bgcolor = "default",
  textColor = "white",
  isLoading = false,
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isLoading}
      className={`w-full  font-semibold py-2 px-4 rounded-lg transition duration-300  my-2 hover:ring-1 hover:ring-blue-950 ${
        colors[bgcolor]
      } ${textColor === "white" ? "text-white" : "text-black"}`}
    >
      {isLoading === true ? "loading..." : children}
    </button>
  );
}
