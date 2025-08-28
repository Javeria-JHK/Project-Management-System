import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import { useLocation } from "react-router-dom";

function Auth() {
  const location = useLocation();
  const IsSignin =
    location.pathname === "/signin" || location.pathname === "/signIn";

  return (
    <div className="w-screen h-screen bg-white text-black p-5">
      <div className="flex h-full w-full justify-between items-center rounded-2xl ">
        <div className="flex flex-col justify-center items-center w-[40%] h-full rounded-2xl">
          {IsSignin ? <SignIn /> : <SignUp />}
        </div>
        <div className="flex justify-center items-center bg-white w-[60%] h-full">
          <img
            src="/Auth-bg.png"
            alt="Image"
            className="w-[80%] h-auto rounded-2xl"
          />
        </div>
      </div>
    </div>
  );
}

export default Auth;
