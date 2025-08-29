import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import Projects from "./pages/Projects/Projects";
import Analytics from "./pages/Analytics/Analytics";
import MyTasks from "./pages/MyTasks/MyTasks";
import Auth from "./pages/Auth/Auth";
import PageNotFound from "./pages/PageNotFound";
import Team from "./pages/Team/Team";
import Workspace from "./pages/Workspaces/workspace";

import {
  AuthProtectedRoute,
  UnAuthProtectedRoute,
} from "./components/ProtectedRoutes";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <AuthProtectedRoute>
              <Dashboard />
            </AuthProtectedRoute>
          }
        >
          <Route path="/projects" element={<Projects />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/my-tasks" element={<MyTasks />} />
          <Route path="/workspaces" element={<Workspace />} />
          <Route path="/team" element={<Team />} />
        </Route>

        <Route
          path="/signin"
          element={
            <UnAuthProtectedRoute>
              <Auth />
            </UnAuthProtectedRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <UnAuthProtectedRoute>
              <Auth />
            </UnAuthProtectedRoute>
          }
        />

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
