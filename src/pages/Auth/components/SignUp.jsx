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

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const CreateAccount = (email) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        localStorage.setItem("user", email);
        resolve({ email });
      }, 2000); //for demonstarting authentication delay
    });
  };

  const handleClick = async () => {
    if (
      name === "" ||
      email === "" ||
      password === "" ||
      confirmPassword === ""
    ) {
      alert("Please fill in all fields.");
    } else if (!isEmailValid(email)) {
      alert("Please enter a valid email address.");
    } else if (password !== confirmPassword) {
      alert("Passwords do not match.");
    } else if (!isPasswordStrong(password)) {
      const errorMessage = checkPasswordError(password);
      alert(errorMessage);
    } else {
      setLoading(true);
      const user = await CreateAccount(email);
      console.log(user);
      alert("Account created successfully!");

      //demonstarting delay after sign Up
      setTimeout(() => {
        setLoading(false);
        navigate("/");
      }, 2000);
    }
  };

  return (
    <div className=" h-full w-full flex flex-col justify-center items-center  p-10  rounded-2xl border-2 border-purple-900">
      <h2 className="text-4xl font-bold mb-3">Create Account!</h2>
      <h2 className="text-xl font-semibold text-black/60 mb-3 ">
        Register to get started
      </h2>
      <form className="w-full mt-6">
        <InputFeild
          id="name"
          label="Full Name"
          type="input"
          placeholder="Enter your full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <InputFeild
          id="email"
          label="Email"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <PasswordFeild
          id="password"
          label="Password"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <PasswordFeild
          id="confirmPassword"
          label="Confirm Password"
          type="password"
          placeholder="Enter your password again"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
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
