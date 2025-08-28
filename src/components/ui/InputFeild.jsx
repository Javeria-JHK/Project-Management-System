function InputFeild({ label, type, id, placeholder, value, onChange }) {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 font-semibold mb-2">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        id={id}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-700"
        placeholder={placeholder}
      />
    </div>
  );
}

export default InputFeild;
