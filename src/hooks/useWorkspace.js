import { useContext } from "react"; 
import { WorkspaceContext } from "../context/workspace/WorkspaceContext";

export function useWorkspace() {
  return useContext(WorkspaceContext);
}

