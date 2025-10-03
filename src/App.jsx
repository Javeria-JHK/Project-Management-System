import AppRoutes from "./components/AppRoutes";

import ThemeProvider from "./context/theme/ThemeProvider";
import { StoreProvider } from "./context/store/StoreProvider";

function App() {
  return (
    <StoreProvider>
      <ThemeProvider>
        <AppRoutes />
      </ThemeProvider>
    </StoreProvider>
  );
}

export default App;
