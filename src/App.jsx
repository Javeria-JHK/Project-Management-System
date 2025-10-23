import AppRoutes from "./components/AppRoutes";
import { StoreProvider } from "./context/store/StoreProvider";

function App() {
  return (
    <StoreProvider>
      <AppRoutes />
    </StoreProvider>
  );
}

export default App;
