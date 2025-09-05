function TextArea({
  label,
  placeholder,
  value,
  onChange,
  required = false,
  error,
  id,
}) {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-gray-700 font-semibold mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <textarea
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-1 ${
          error
            ? "border-red-500 focus:ring-red-500"
            : "border-gray-300 focus:ring-gray-700"
        }`}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}

export default TextArea;
