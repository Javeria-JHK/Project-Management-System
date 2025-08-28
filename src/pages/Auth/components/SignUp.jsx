import React, { useState } from "react";
import InputFeild from "../../../components/ui/InputFeild";
import Button from "../../../components/ui/Button";
import { Link } from "react-router-dom";

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleClick = () => {
    console.log(
      "Button clicked with name:",
      name,
      "email:",
      email,
      " password:",
      password,
      " confirmPassword:",
      confirmPassword
    );
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setName("");
  };

  return (
    <div className=" h-full w-full flex flex-col justify-center items-center bg-gray-50 p-10  rounded-2xl border border-gray-600">
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
        <InputFeild
          id="password"
          label="Password"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <InputFeild
          id="confirmPassword"
          label="Confirm Password"
          type="password"
          placeholder="Enter your password again"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <Button onClick={handleClick}>Sign Up</Button>
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
