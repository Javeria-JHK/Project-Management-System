import AppRoutes from "./components/AppRoutes";
import { WorkspaceProvider } from "./context/workspace/WorkspaceProvider";

function App() {
  return (
    <WorkspaceProvider>
      <AppRoutes />
    </WorkspaceProvider>
  );
}

export default App;
