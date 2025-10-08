import { useStore } from "./useStore";
import {WORKSPACE_ACTIONS} from "../context/store/actionTypes";

export function useWorkspace() {
  const { state, dispatch } = useStore();
  const {workspace} = state;


  function updateWorkspace(id) {
    console.log("Setting active workspace to id:", id);
    dispatch({ type: WORKSPACE_ACTIONS.SET_ACTIVE_WORKSPACE, payload: id });


   
  }

  return {
    isWorkspaceLoading:workspace.isWorkspaceLoading,
    workspaceId: workspace.activeWorkspaceId,
    workspaces: workspace.workspaces,
    updateWorkspace,
  };
}

