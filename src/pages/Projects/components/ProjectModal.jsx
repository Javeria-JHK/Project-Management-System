import { useState, useEffect } from "react";
import InputFeild from "../../../components/ui/InputFeild";
import TextArea from "../../../components/ui/TextArea";
import Button from "../../../components/ui/Button";

export default function ProjectModal({ isOpen, onClose, onSave, initialData }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [errors, setErrors] = useState({});

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

  const validate = () => {
    let newErrors = {};
    if (!name.trim()) newErrors.name = "Project name is required";
    else if (name.trim().length < 6)
      newErrors.name = "Project name must be at least 6 characters";
    else if (name.trim().length > 30)
      newErrors.name = "Project name must be less than 30 characters";
    if (description.trim().length < 10 && description.trim().length > 0)
      newErrors.description = "Description must be at least 10 characters";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleClose = () => {
    onClose();
    setName("");
    setDescription("");
    setStatus("To Do");
    setErrors({});
  };
  const handleSubmit = () => {
    if (validate()) {
      onSave({
        name,
        description,
        status,
        members: 1,
      });
      setName("");
      setDescription("");
      setStatus("To Do");
      setErrors({});
      onClose();
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
          required
          onChange={(e) => {
            setName(e.target.value);
            if (errors.name) {
              setErrors((prev) => ({ ...prev, name: "" }));
            }
          }}
          error={errors.name}
        />

        {/* Description */}
        <TextArea
          label="Description"
          placeholder="Enter description..."
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
            if (errors.description) {
              setErrors((prev) => ({ ...prev, description: "" }));
            }
          }}
          error={errors.description}
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

        <div className="flex justify-end mt-4  pt-2 gap-2">
          <Button
            onClick={handleClose}
            className="px-4 py-2 text-white border rounded"
            width="w-[20%]"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            className="px-4 py-2  text-white rounded"
            width="w-[20%]"
            bgcolor="gray"
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}
