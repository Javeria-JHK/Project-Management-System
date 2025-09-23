import { useContext } from "react";
import ThemeContext from "../context/theme/ThemeContext";

export default function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used inside ThemeProvider");
  }
  return ctx;
}
