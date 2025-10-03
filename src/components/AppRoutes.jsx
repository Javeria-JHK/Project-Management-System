import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard/Dashboard";
import Projects from "../pages/Projects/Projects";
import Analytics from "../pages/Analytics/Analytics";
import MyTasks from "../pages/MyTasks/MyTasks";
import Auth from "../pages/Auth/Auth";
import PageNotFound from "../pages/PageNotFound";
import Settings from "../pages/Settings/Settings";
import DashboardView from "../pages/Dashboard/DashboardView";
import Workspace from "../pages/Workspaces/workspace";

import {
  AuthProtectedRoute,
  UnAuthProtectedRoute,
} from "../components/ProtectedRoutes";
import ProjectDetail from "../pages/Projects/ProjectDetail";
import Members from "../pages/Members/Members";
import TaskDrawer from "../pages/Projects/components/TaskDrawer";
import TasksKanban from "../pages/Projects/components/TasksKanban";
import MemberList from "../pages/Projects/components/MembersList";

function AppRoutes() {
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
          <Route index element={<DashboardView />} />

          <Route path="/projects" element={<Projects />} />
          <Route path="projects/:id/tasks" element={<ProjectDetail />}></Route>
          <Route path="projects/:id" element={<ProjectDetail />}>
            <Route path="tasks/:taskId" element={<TaskDrawer />} />
            <Route path="members" element={null} />
          </Route>

          <Route path="/analytics" element={<Analytics />} />
          <Route path="/my-tasks" element={<MyTasks />}>
            <Route path=":taskId" element={<TaskDrawer />} />
          </Route>
          <Route path="/workspaces" element={<Workspace />} />
          <Route path="/workspaces/:id" element={<Workspace />} />

          <Route path="/members" element={<Members />} />
          <Route path="/settings" element={<Settings />} />
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

export default AppRoutes;
