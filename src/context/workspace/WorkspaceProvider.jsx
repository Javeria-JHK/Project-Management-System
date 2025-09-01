import { useState } from "react";
import { WorkspaceContext } from "./WorkspaceContext";

export function WorkspaceProvider({ children }) {
  const [workspace, setWorkspace] = useState(
    localStorage.getItem("Workspace") || "My Workspace"
  );

  const updateWorkspace = (ws) => {
    setWorkspace(ws);
    localStorage.setItem("Workspace", ws);
  };

  return (
    <WorkspaceContext.Provider value={{ workspace, updateWorkspace }}>
      {children}
    </WorkspaceContext.Provider>
  );
}
