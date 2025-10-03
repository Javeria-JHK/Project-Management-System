import { useState, useEffect } from "react";
import InputFeild from "../../../components/ui/InputFeild";
import TextArea from "../../../components/ui/TextArea";
import Button from "../../../components/ui/Button";

export default function WorkspaceModal({
  isOpen,
  onClose,
  onSave,
  initialData,
}) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setName(initialData.name || "");
      setDescription(initialData.description || "");
    } else {
      setName("");
      setDescription("");
    }
  }, [initialData]);

  const validate = () => {
    let newErrors = {};
    if (!name.trim()) newErrors.name = "Workspace name is required";
    else if (name.trim().length < 6)
      newErrors.name = "Workspace name must be at least 6 characters.";
    else if (name.trim().length > 30)
      newErrors.name = "Workspace name must be less than 30 characters.";

    if (description.trim().length < 10 && description.trim().length > 0)
      newErrors.description = "Description must be at least 10 characters.";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      onSave({ name, description, members: initialData?.members || 1 });
      setName("");
      setDescription("");
      setErrors({});
      onClose();
    }
  };
  const handleClose = () => {
    onClose();
    setName("");
    setDescription("");
    setErrors({});
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
          onChange={(e) => {
            setName(e.target.value);

            if (errors.name) {
              setErrors((prev) => ({ ...prev, name: "" }));
            }
          }}
          error={errors.name}
          required
        />
        <TextArea
          label={"Description"}
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
        <div className="flex justify-end gap-2">
          <Button
            onClick={handleClose}
            width="w-[20%]"
            className="px-4 py-2 text-white border rounded"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            width="w-[20%]"
            bgcolor="gray"
            className="px-4 py-2  text-white rounded"
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}
