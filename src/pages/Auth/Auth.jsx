import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import { useLocation } from "react-router-dom";

function Auth() {
  const location = useLocation();
  const IsSignin =
    location.pathname === "/signin" || location.pathname === "/signIn";

  return (
    <div className="w-screen h-screen bg-white text-black ">
      <div className="flex h-full w-full justify-between items-center ">
        <div className="flex flex-col justify-center items-center w-[40%] h-full py-5 px-10">
          {IsSignin ? <SignIn /> : <SignUp />}
        </div>
        <div className="flex justify-center items-center w-[60%] h-full ">
          <img
            src="/signUp-bg.jpg"
            alt="Image"
            className="h-full object-fill rounded-l-2xl"
          />
        </div>
      </div>
    </div>
  );
}

export default Auth;
