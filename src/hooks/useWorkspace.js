import { useStore } from "./useStore";

export function useWorkspace() {
  const { state, dispatch } = useStore();

  function updateWorkspace(id) {
    console.log("Setting active workspace to id:", id);
    dispatch({ type: "SET_ACTIVE_WORKSPACE", payload: id });
    localStorage.setItem("workspaceId",id);
  }

  return {
    workspaceId: state.activeWorkspaceId,
    workspaces: state.workspaces,
    updateWorkspace,
  };
}

