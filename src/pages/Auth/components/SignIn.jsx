import React, { useState } from "react";
import InputFeild from "../../../components/ui/InputFeild";
import Button from "../../../components/ui/Button";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const tempAuth = (email, password) => {
    setLoading(true);
    return new Promise((resolve) => {
      if (email === "javeria@wanclouds.net" && password === "123456") {
        setTimeout(() => {
          setLoading(false);
          resolve(email);
        }, 2000);
      } else {
        setLoading(false);
        resolve(null);
      }
    });
  };

  const handleClick = async () => {
    if (email === "" || password === "") {
      alert("Please fill in all fields.");
    } else if (!isEmailValid(email)) {
      alert("Please enter a valid email address.");
    }
    const user = await tempAuth(email, password);
    localStorage.setItem("user", user);
    console.log(user);
    if (user) {
      navigate("/");
    } else alert("Invalid email or password.");
  };

  const isEmailValid = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  return (
    <div className=" h-full w-full flex flex-col justify-center items-center bg-gray-50 p-10  rounded-2xl border border-gray-600">
      <h2 className="text-4xl font-bold mb-3">Welcome Back!</h2>
      <h2 className="text-xl font-semibold text-black/60 mb-3 ">
        Sign In to Continue
      </h2>
      <form className="w-full mt-6">
        <InputFeild
          id="email"
          label="Email"
          type="email"
          required
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <InputFeild
          id="password"
          label="Password"
          type="password"
          placeholder="Enter your password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={handleClick} isLoading={loading}>
          Sign In
        </Button>
      </form>
      <div className="flex justify-center w-full">
        <p className="mt-4 text-sm text-gray-600">
          Don't have an account?{" "}
          <Link to="/signup">
            <span className="hover:underline">Sign Up</span>
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignIn;
