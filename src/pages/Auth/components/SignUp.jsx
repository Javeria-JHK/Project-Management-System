import React, { useState } from "react";
import InputFeild from "../../../components/ui/InputFeild";
import PasswordFeild from "../../../components/ui/PasswordFeild";
import Button from "../../../components/ui/Button";
import { Link, useNavigate } from "react-router-dom";
import {
  isEmailValid,
  isPasswordStrong,
  checkPasswordError,
} from "../../../utils/validation";
import { signUp } from "../../../api/auth";

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [showApiError, setShowApiError] = useState(false);
  const [apiError, setApiError] = useState("");

  const navigate = useNavigate();

  // const CreateAccount = (email) => {
  //   return new Promise((resolve) => {
  //     setTimeout(() => {
  //       localStorage.setItem("user", email);
  //       resolve({ email });
  //     }, 2000); //for demonstarting authentication delay
  //   });
  // };

  const handleClick = async () => {
    let newErrors = {};
    if (name === "") {
      newErrors.name = "Name is required.";
    }
    if (email === "") {
      newErrors.email = "Email is required.";
    } else if (!isEmailValid(email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (password === "") {
      newErrors.password = "Password is required.";
    } else if (!isPasswordStrong(password)) {
      const errorMessage = checkPasswordError(password);
      newErrors.password = errorMessage;
    }
    if (confirmPassword === "") {
      newErrors.confirmPassword = "Confirm password is required.";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    const data = await signUp(name, email, password);
    console.log(data);

    setLoading(false);
    if (data.error) {
      setApiError(data.error);
      setShowApiError(true);
      return;
    }
    if (data) {
      localStorage.setItem("user", email);
      alert(data.message);
      // localStorage.setItem("access_token", data.tokens.access_token);
      navigate("/");
    }
    setErrors(newErrors);
  };

  return (
    <div className=" h-full w-full flex flex-col justify-center items-center  p-10  rounded-2xl border-2 border-purple-900">
      <h2 className="text-4xl font-bold mb-3">Create Account!</h2>
      <h2 className="text-xl font-semibold text-black/60 mb-3 ">
        Register to get started
      </h2>
      {showApiError && (
        <div className=" w-full mt-4 px-4 py-2 bg-red-100 text-red-500 text-md rounded-lg border-1 border-red-300">
          <p>{apiError}</p>
        </div>
      )}
      <form className="w-full mt-6">
        <InputFeild
          id="name"
          label="Full Name"
          type="input"
          required
          placeholder="Enter your full name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);

            if (errors.name) {
              setErrors((prev) => ({ ...prev, name: "" }));
            }
          }}
          error={errors.name}
        />
        <InputFeild
          id="email"
          label="Email"
          type="email"
          required
          placeholder="Enter your email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setShowApiError(false);
            if (errors.email) {
              setErrors((prev) => ({ ...prev, email: "" }));
            }
          }}
          error={errors.email}
        />
        <PasswordFeild
          id="password"
          label="Password"
          type="password"
          required
          placeholder="Enter your password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);

            if (errors.password) {
              setErrors((prev) => ({ ...prev, password: "" }));
            }
          }}
          error={errors.password}
        />
        <PasswordFeild
          id="confirmPassword"
          label="Confirm Password"
          type="password"
          required
          placeholder="Enter your password again"
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
            if (errors.confirmPassword) {
              setErrors((prev) => ({ ...prev, confirmPassword: "" }));
            }
          }}
          error={errors.confirmPassword}
        />
        <Button onClick={handleClick} isLoading={loading}>
          Sign Up
        </Button>
      </form>
      <div className="flex justify-center w-full">
        <p className="mt-4 text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/signin">
            <span className="hover:underline">Sign In</span>
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
