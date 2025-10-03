import { useStore } from "../hooks/useStore";
import { Navigate } from "react-router-dom";

export function AuthProtectedRoute({ children }) {
  const { state } = useStore();
  const user = state.auth.user || localStorage.getItem("user");

  if (!user) {
    console.log("User in AuthProtectedRoute: user is logged off", user);
    return <Navigate to="/signin" replace />;
  }
  return children;
}

export function UnAuthProtectedRoute({ children }) {
  const { state } = useStore();
  const user = state.auth.user || localStorage.getItem("user");

  if (user) {
    console.log("User in UnAuthProtectedRoute: user is logged In", user);
    return <Navigate to="/" replace />;
  }
  return children;
}
