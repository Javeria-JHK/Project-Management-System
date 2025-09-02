import { useState, useEffect } from "react";
import InputFeild from "../../../components/ui/InputFeild";
import TextArea from "../../../components/ui/TextArea";

export default function WorkspaceModal({
  isOpen,
  onClose,
  onSave,
  initialData,
}) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (initialData) {
      setName(initialData.name || "");
      setDescription(initialData.description || "");
    } else {
      setName("");
      setDescription("");
    }
  }, [initialData]);

  const handleSubmit = () => {
    if ((name !== "") | (description !== "")) {
      onSave({ name, description, members: initialData?.members || 1 });
      setName("");
      setDescription("");
      onClose();
    } else {
      alert("Please fill in all the feilds");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center">
      <div className="bg-white text-gray-800 rounded-lg shadow py-10 px-8 w-[40%]  border-2 border-gray-800">
        <h2 className="text-2xl text-gray-900 font-bold mb-4">
          {initialData ? "Edit Workspace" : "Add Workspace"}
        </h2>
        <InputFeild
          label={"Workspace Name"}
          type="text"
          placeholder="Enter name of workspace"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextArea
          label={"Description"}
          placeholder="Enter description..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-white border rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
