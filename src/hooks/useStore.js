import { useContext } from "react";
import StoreContext from "../context/store/StoreContext";

export function useStore() {
  return useContext(StoreContext);
}