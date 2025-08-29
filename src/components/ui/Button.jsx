export default function Button({
  type = "button",
  children,
  onClick,
  bgcolor,
  textColor = "white",
  isLoading = false,
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      color={bgcolor}
      style={{ backgroundColor: bgcolor }}
      disabled={isLoading}
      className={`w-full  font-semibold py-2 px-4 rounded-lg transition duration-300  my-2 hover:ring-1 hover:ring-blue-950 ${
        textColor === "white" ? "text-white" : "text-black"
      }`}
    >
      {isLoading === true ? "loading..." : children}
    </button>
  );
}
