import AppRoutes from "./components/AppRoutes";
import { WorkspaceProvider } from "./context/workspace/WorkspaceProvider";
import ThemeProvider from "./context/theme/ThemeProvider";

function App() {
  return (
    <ThemeProvider>
      <WorkspaceProvider>
        <AppRoutes />
      </WorkspaceProvider>
    </ThemeProvider>
  );
}

export default App;
