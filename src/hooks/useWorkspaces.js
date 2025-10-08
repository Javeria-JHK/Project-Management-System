import { useStore } from "./useStore";
import { fetchWithAuth } from "../api/fetchWithAuth";
import {WORKSPACE_ACTIONS} from "../context/store/actionTypes";

export function useWorkspaces() {
  const { state, dispatch } = useStore();
  const workspaceState = state.workspace; 
  const { workspaces, currentWorkspace } = workspaceState;

  

  async function getWorkspaces(paramId = null) {
    try {
      dispatch({ type: WORKSPACE_ACTIONS.WORKSPACE_REQUEST});

      const res = await fetchWithAuth(
        `/api/workspaces`,
        { method: "GET" },
        state,
        dispatch
      );

      const response = await res.json();
      if (!res.ok) throw new Error(response.error || "Failed to fetch workspaces");

      const workspaces = response.data || [];
      dispatch({ type: WORKSPACE_ACTIONS.SET_WORKSPACES, payload: workspaces });

      // ✅ Set active workspace
      if (workspaces.length > 0) {
        // Case 1: If we got an ID from route param, make that active
        if (paramId) {
          const match = workspaces.find(ws => ws.id === paramId);
          if (match) {
            dispatch({ type: WORKSPACE_ACTIONS.SET_ACTIVE_WORKSPACE, payload: match.id });
          } else {
            // Fallback to first workspace if not found
            dispatch({ type: WORKSPACE_ACTIONS.SET_ACTIVE_WORKSPACE, payload: workspaces[0].id });
          }
        }
        // Case 2: If there's no ID and no active workspace yet, set first as default
        else if (!state.activeWorkspaceId) {
          dispatch({ type: WORKSPACE_ACTIONS.SET_ACTIVE_WORKSPACE, payload: workspaces[0].id });
        }
      }

      console.log("Fetched workspaces:", workspaces);
      return workspaces;
    } catch (error) {
      console.error("Error fetching workspaces:", error);
      return { error: error.message };
    } finally {
      dispatch({ type: "SET_WORKSPACES_DONE" });
    }
  }

  async function createWorkspace(name, description) {
    try {
      dispatch({ type:WORKSPACE_ACTIONS.WORKSPACE_REQUEST });
      const res = await fetchWithAuth(
        `/api/workspaces`,
        {
          method: "POST",
          body: JSON.stringify({ name, description }),
        },
        state,
        dispatch
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to create workspace");
      dispatch({ type: WORKSPACE_ACTIONS.ADD_WORKSPACE, payload: data });
      return data;
    } catch (error) {
      console.error("Error creating workspace:", error);
      return { error: error.message };
    } finally {
      dispatch({ type: "SET_WORKSPACES_DONE" });
    }
  }

  async function getWorkspaceById(id) {
    try {
      dispatch({ type: WORKSPACE_ACTIONS.WORKSPACE_REQUEST });
      const res = await fetchWithAuth(
        `/api/workspaces/${id}`,
        { method: "GET" },
        state,
        dispatch
      );
      const response = await res.json();
      if (!res.ok) throw new Error(response.error || "Failed to fetch workspace details");
      dispatch({ type: WORKSPACE_ACTIONS.SET_ACTIVE_WORKSPACE, payload: response });
      return response;
    } catch (error) {
      console.error("Error fetching workspace details:", error);
      return { error: error.message };
    } finally {
      dispatch({ type: "SET_WORKSPACES_DONE" });
    }
  }

  async function editWorkspace(id, updates) {
    try {
      dispatch({ type: WORKSPACE_ACTIONS.WORKSPACE_REQUEST });
      const res = await fetchWithAuth(
        `/api/workspaces/${id}`,
        {
          method: "PUT",
          body: JSON.stringify(updates),
        },
        state,
        dispatch
      );

      const text = await res.text();
      const response = text ? JSON.parse(text) : {};

      if (!res.ok) throw new Error(response.error || "Failed to update workspace");
      dispatch({ type: WORKSPACE_ACTIONS.EDIT_WORKSPACE, payload: response });
      return response;
    } catch (error) {
      console.error("Error updating workspace:", error);
      return { error: error.message };
    } finally {
      dispatch({ type: "SET_WORKSPACES_DONE" });
    }
  }

  async function deleteWorkspace(id) {
    try {
      dispatch({ type: WORKSPACE_ACTIONS.WORKSPACE_REQUEST });
      const res = await fetchWithAuth(
        `/api/workspaces/${id}`,
        { method: "DELETE" },
        state,
        dispatch
      );

      const text = await res.text();
      const response = text ? JSON.parse(text) : {};

      if (!res.ok) throw new Error(response.error || "Failed to delete workspace");
      dispatch({ type: WORKSPACE_ACTIONS.DELETE_WORKSPACE, payload: id });
      return response;
    } catch (error) {
      console.error("Error deleting workspace:", error);
      return { error: error.message };
    } finally {
      dispatch({ type: "SET_WORKSPACES_DONE" });
    }
  }

  return {
    workspaces: workspaces,
    currentWorkspace: currentWorkspace,
    getWorkspaces,
    createWorkspace,
    getWorkspaceById,
    editWorkspace,
    deleteWorkspace,
  };
}
