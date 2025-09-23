import React, { useState } from "react";
import InputFeild from "../../../components/ui/InputFeild";
import Button from "../../../components/ui/Button";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { isEmailValid } from "../../../utils/validation";
import PasswordFeild from "../../../components/ui/PasswordFeild";
import { signIn } from "../../../api/auth";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [invalidCred, setInvalidCred] = useState(false);
  const [apiError, setApiError] = useState("");

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // const tempAuth = (email, password) => {
  //   setLoading(true);
  //   return new Promise((resolve) => {
  //     setTimeout(() => {
  //       if (email === "javeria@wanclouds.net" && password === "123456") {
  //         setLoading(false);
  //         resolve(email);
  //       } else {
  //         setLoading(false);
  //         resolve(null);
  //       }
  //     }, 2000); //for demonstarting authentication delay
  //   });
  // };

  const handleClick = async () => {
    let newErrors = {};
    if (password === "") {
      newErrors.password = "Password is required.";
    }

    if (email === "") {
      newErrors.email = "Email Address is required";
    } else if (!isEmailValid(email)) {
      newErrors.email = "Please enter a valid email address.";
    } else {
      setLoading(true);

      const data = await signIn(email, password);
      setLoading(false);
      if (data.error) {
        setApiError(data.error);
        setInvalidCred(true);
        return;
      }
      if (data) {
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("access_token", data.tokens.access_token);
        localStorage.setItem("refresh_token", data.tokens.refresh_token);
        navigate("/");
      }
    }
    //   const user = await tempAuth(email, password);
    //   localStorage.setItem("user", user);
    //   console.log(user);
    //   if (user) {
    //     navigate("/");
    //   } else {
    //     setInvalidCred(true);
    //   }
    // }
    //
    setErrors(newErrors);
  };

  return (
    <div className=" h-full w-full flex flex-col justify-center items-center  p-10  rounded-2xl border-2 border-purple-900">
      <h2 className="text-4xl font-bold mb-3">Welcome Back!</h2>
      <h2 className="text-xl font-semibold text-black/60 mb-3 ">
        Sign In to Continue
      </h2>
      {invalidCred && (
        <div className=" w-full mt-4 px-4 py-2 bg-red-100 text-red-500 text-md rounded-lg border-1 border-red-300">
          <p>{apiError}</p>
        </div>
      )}

      <form className="w-full mt-4">
        <InputFeild
          id="email"
          label="Email"
          type="email"
          placeholder="Enter your email"
          required
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setInvalidCred(false);
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
          placeholder="Enter your password"
          required
          value={password}
          onChange={(e) => {
            setInvalidCred(false);
            setPassword(e.target.value);
            if (errors.password) {
              setErrors((prev) => ({ ...prev, password: "" }));
            }
          }}
          error={errors.password}
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
