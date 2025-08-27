import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import Analytics from "./pages/Analytics";
import MyTasks from "./pages/MyTasks";
import PageNotFound from "./pages/PageNotFound";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />}>
          <Route path="/projects" element={<Projects />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/my-tasks" element={<MyTasks />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
