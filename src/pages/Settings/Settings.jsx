import { useState, useEffect } from "react";
import Button from "../../components/ui/Button";
import PasswordFeild from "../../components/ui/PasswordFeild";
import { isPasswordStrong, checkPasswordError } from "../../utils/validation";

function Settings() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const user = {
    name: "Alice Johnson",
    email: "alice@example.com",
  };

  // Avatar initials
  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => setSuccessMessage(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  const validateForm = () => {
    let newErrors = {};
    if (!formData.currentPassword) {
      newErrors.currentPassword = "Current password is required";
    }
    if (!formData.newPassword) {
      newErrors.newPassword = "New password is required";
    } else if (!isPasswordStrong(formData.newPassword)) {
      const errorMessage = checkPasswordError(formData.newPassword);
      newErrors.newPassword = errorMessage;
    }
    if (
      formData.newPassword !== "" &&
      formData.newPassword === formData.currentPassword
    ) {
      newErrors.newPassword = "Old and new Password are same.";
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    console.log("Password changed:", formData);
    setIsModalOpen(false);
    setFormData({ currentPassword: "", newPassword: "", confirmPassword: "" });
    setSuccessMessage("✅ Password updated successfully!");
  };

  return (
    <div className="px-2 h-full w-full relative">
      {/* Success Toast */}
      {successMessage && (
        <div className="fixed top-5 right-5 bg-green-100 border border-green-400 text-green-800 px-4 py-2 rounded-lg shadow-md animate-fadeIn">
          {successMessage}
        </div>
      )}
      {/* Header */}
      <h2 className="text-2xl font-bold text-black mb-4">Settings</h2>

      {/* Profile Section Card */}
      <div className="bg-white w-full max-w-2xl rounded-xl p-6 shadow-lg">
        <h3 className="text-xl font-semibold text-gray-700 mb-6 border-b pb-3">
          Profile Information
        </h3>

        <div className="flex items-center gap-6 mb-8">
          {/* Avatar */}
          <div className="w-20 h-20 rounded-full bg-gray-900 text-white flex items-center justify-center text-2xl font-bold shadow-md">
            {initials}
          </div>

          {/* Name + Email */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">
              {user.name}
            </h2>
            <p className="text-gray-500">{user.email}</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex">
          <Button
            onClick={() => setIsModalOpen(true)}
            width="w-[50%]"
            bgcolor="gray"
          >
            Change Password
          </Button>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white text-gray-800 rounded-xl p-8 w-full max-w-lg shadow-xl animate-fadeIn">
            <h3 className="text-xl font-bold mb-6 text-gray-700">
              Change Password
            </h3>
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Current Password */}
              <PasswordFeild
                id="currentPassword"
                label="Current Password"
                type="password"
                placeholder="Enter your current password"
                required
                value={formData.currentPassword}
                onChange={(e) => {
                  setFormData({ ...formData, currentPassword: e.target.value });
                  if (errors.currentPassword) {
                    setErrors((prev) => ({ ...prev, currentPassword: "" }));
                  }
                }}
                error={errors.currentPassword}
              />

              {/* New Password */}
              <PasswordFeild
                id="newPassword"
                label="New Password"
                type="password"
                placeholder="Enter your new password"
                required
                value={formData.newPassword}
                onChange={(e) => {
                  setFormData({ ...formData, newPassword: e.target.value });
                  if (errors.newPassword) {
                    setErrors((prev) => ({ ...prev, newPassword: "" }));
                  }
                }}
                error={errors.newPassword}
              />

              {/* Confirm Password */}
              <PasswordFeild
                id="confirmNewPassword"
                label="Confirm New Password"
                type="password"
                placeholder="Enter your new password again"
                required
                value={formData.confirmPassword}
                onChange={(e) => {
                  setFormData({ ...formData, confirmPassword: e.target.value });
                  if (errors.confirmPassword) {
                    setErrors((prev) => ({ ...prev, confirmPassword: "" }));
                  }
                }}
                error={errors.confirmPassword}
              />

              {/* Actions */}
              <div className="flex justify-end gap-4 mt-6">
                <Button
                  width="w-[30%]"
                  onClick={(e) => {
                    e.preventDefault();
                    setFormData({
                      currentPassword: "",
                      newPassword: "",
                      confirmPassword: "",
                    });
                    setErrors({});
                    setIsModalOpen(false);
                  }}
                >
                  Cancel
                </Button>
                <Button width="w-[30%]" bgcolor="gray" type="submit">
                  Save
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Settings;
