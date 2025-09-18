function Badge({ text, color = "blue" }) {
  const colorClasses = {
    blue: "bg-blue-800 text-blue-100",
    green: "bg-green-800 text-green-100",
    red: "bg-red-800 text-red-100",
    yellow: "bg-yellow-800 text-yellow-100",
    gray: "bg-gray-800 text-gray-100",
  };

  return (
    <div
      className={`flex justify-center items-center w-4 h-4 font-medium text-xs rounded-full ${
        colorClasses[color] || colorClasses.blue
      }`}
    >
      {text}
    </div>
  );
}

export default Badge;
