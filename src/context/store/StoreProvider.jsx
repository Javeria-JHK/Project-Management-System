import { useReducer } from "react";
import StoreContext from "./StoreContext";
import { rootReducer, initialState } from "./reducers";

export function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(rootReducer, initialState);
  console.log("###Store ", state);
  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
}
