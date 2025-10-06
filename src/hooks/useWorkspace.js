import { useStore } from "./useStore";

export function useWorkspace() {
  const { state, dispatch } = useStore();
  const {workspace} = state;


  function updateWorkspace(id) {
    console.log("Setting active workspace to id:", id);
    dispatch({ type: "SET_ACTIVE_WORKSPACE", payload: id });


   
  }

  return {
    workspaceId: workspace.activeWorkspaceId,
    workspaces: workspace.workspaces,
    updateWorkspace,
  };
}

