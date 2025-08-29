import { Navigate } from "react-router-dom";

export function AuthProtectedRoute({ children }) {
  const user = localStorage.getItem("user");
  if (!user) {
    return <Navigate to="/signin" />;
  } else return children;
}

export function UnAuthProtectedRoute({ children }) {
  const user = localStorage.getItem("user");
  if (user) {
    return <Navigate to="/" />;
  } else return children;
}
