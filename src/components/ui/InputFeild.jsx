function InputField({
  label,
  type = "text",
  id,
  placeholder,
  value,
  onChange,
  required = false,
  error,
  onBlur,
}) {
  return (
    <div className="mb-4">
      {/* Label with required asterisk */}
      <label htmlFor={id} className="block text-gray-700 font-semibold mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      {/* Input */}
      <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        onBlur={onBlur}
        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-1 
          ${
            error
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:ring-gray-700"
          }`}
      />

      {/* Error message */}
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}

export default InputField;
