import { useState, useEffect } from "react";
import InputFeild from "../../../components/ui/InputFeild";
import TextArea from "../../../components/ui/TextArea";
import SelectMenu from "../../../components/ui/Select";

const priorities = ["Low", "Normal", "High", "Urgent"];

function AddTaskModal({ isOpen, onClose, onSave, initialData, members }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [assignee, setAssignee] = useState(members?.[0]?.name || "");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("Normal");
  const [errors, setErrors] = useState({});

  const id = 15;

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || "");
      setDescription(initialData.description || "");

      setAssignee(initialData.assignedTo || members?.[0].value || "");
      setDueDate(initialData.dueDate || "");
      setPriority(initialData.priority || "Normal");
    } else {
      setTitle("");
      setDescription("");

      setAssignee(members?.[0].value || "");
      setDueDate("");
      setPriority("Normal");
    }
    setErrors({});
  }, [initialData, members]);

  const validate = () => {
    const newErrors = {};
    if (!title.trim()) newErrors.title = "Task title is required";
    if (title.trim().length > 30)
      newErrors.description = "Description must be less than 30 characters.";

    if (description.trim().length < 5 && description.trim().length > 0)
      newErrors.description = "Description must be at least 5 characters.";
    if (!dueDate.trim()) setErrors.dueDate = "Due Date is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    onSave({
      id: initialData?.id || title + id,
      title,
      description,
      status: "To Do",
      assignedTo: assignee,
      dueDate,
      priority,
      comments: initialData?.comments || 0,
    });
    setTitle("");
    setDescription("");

    setAssignee("");
    setDueDate("");
    setPriority("Normal");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white text-gray-800 rounded-lg shadow py-8 px-6 w-[40%] border-2 border-gray-800">
        <h2 className="text-2xl text-gray-900 font-bold mb-4">
          {initialData ? "Edit Task" : "Add Task"}
        </h2>

        {/* Title */}
        <InputFeild
          label="Task Title"
          type="text"
          placeholder="Enter task title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            if (errors.title) setErrors({ ...errors, title: "" });
          }}
          required
          error={errors.title}
        />

        {/* Description */}
        <TextArea
          label="Description"
          placeholder="Enter description..."
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
            if (errors.description) setErrors({ ...errors, description: "" });
          }}
          error={errors.description}
        />

        {/* Assignee */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Assignee
          </label>
          <div className="w-full px-3 py-2 border h-10 flex items-center justify-center border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-700">
            <SelectMenu
              value={assignee}
              onChange={(e) => setAssignee(e.target.value)}
              items={members}
              widthx={"w-full"}
            />
          </div>
        </div>

        {/* Due Date */}
        <InputFeild
          label="Due Date"
          type="date"
          value={dueDate}
          onChange={(e) => {
            setDueDate(e.target.value);
            if (errors.dueDate) setErrors({ ...errors, dueDate: "" });
          }}
          required
          error={errors.dueDate}
        />

        {/* Priority */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Priority
          </label>
          <div className="flex gap-2 flex-wrap">
            {priorities.map((p) => (
              <div
                key={p}
                onClick={() => setPriority(p)}
                className={`px-4 py-1 rounded-full text-sm font-medium border cursor-pointer transition
                  ${
                    priority === p
                      ? "bg-gray-700 text-white border-gray-700"
                      : "bg-gray-100 text-gray-700 border-gray-400 hover:bg-gray-200"
                  }`}
              >
                {p}
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 border rounded hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddTaskModal;
