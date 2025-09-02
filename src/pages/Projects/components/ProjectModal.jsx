import { useState, useEffect } from "react";
import InputFeild from "../../../components/ui/InputFeild";
import TextArea from "../../../components/ui/TextArea";
import Button from "../../../components/ui/Button";

export default function ProjectModal({ isOpen, onClose, onSave, initialData }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (initialData) {
      setName(initialData.name || "");
      setDescription(initialData.description || "");
      setStatus(initialData.status || "To Do");
    } else {
      setName("");
      setDescription("");
      setStatus("To Do");
    }
  }, [initialData]);

  const handleSubmit = () => {
    if (name !== "" && description !== "") {
      onSave({
        name,
        description,
        status,
        members: 1,
      });
      setName("");
      setDescription("");
      setStatus("To Do");

      onClose();
    } else {
      alert("Please fill in all required fields");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center">
      <div className="bg-white text-gray-800 rounded-lg shadow py-10 px-8 w-[40%] border-2 border-gray-800">
        <h2 className="text-2xl text-gray-900 font-bold mb-4">
          {initialData ? "Edit Project" : "Add Project"}
        </h2>

        {/* Project Name */}
        <InputFeild
          label="Project Name"
          type="text"
          placeholder="Enter project name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        {/* Description */}
        <TextArea
          label="Description"
          placeholder="Enter description..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        {/* Status Chips */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Status: <span className="text-gray-900">{status}</span>
          </label>
          <div className="flex gap-2">
            {["To Do", "In Progress", "Completed", "In Review"].map((s) => (
              <div
                key={s}
                type="button"
                onClick={() => setStatus(s)}
                className={`px-4 py-2 rounded-full text-sm font-medium border transition cursor-pointer
          ${
            status === s
              ? "bg-gray-700 text-white border-blue-600"
              : "bg-gray-100 text-gray-700 border-gray-900 hover:bg-gray-200"
          }`}
              >
                {s}
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-white border rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2  text-white rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
