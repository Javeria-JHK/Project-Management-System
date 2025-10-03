import { useStore } from "./useStore";
import { fetchWithAuth } from "../api/fetchWithAuth";

export function useWorkspaces() {
  const { state, dispatch } = useStore();

  async function getWorkspaces() {
    try {
      dispatch({ type: "WORKSPACE_REQUEST" });
      const res = await fetchWithAuth(
        `/api/workspaces`,
        { method: "GET" },
        state,
        dispatch
      );
      const response = await res.json();
      if (!res.ok)
        throw new Error(response.error || "Failed to fetch workspaces");

      dispatch({ type: "SET_WORKSPACES", payload: response.data });
      
      const activeWsId = localStorage.getItem("workspaceId");
      if(activeWsId){
        dispatch({type:"SET_ACTIVE_WORKSPACE", payload:activeWsId})
      }


      return response.data;
    } catch (error) {
      console.error("Error fetching workspaces:", error);
      return { error: error.message };
    } finally {
      dispatch({ type: "SET_WORKSPACES_DONE" });
    }
  }

  async function createWorkspace(name, description) {
    try {
      dispatch({ type: "WORKSPACE_REQUEST" });
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
      if (!res.ok) {
        throw new Error(data.error || "Failed to create workspace");
      }
      dispatch({ type: "ADD_WORKSPACE", payload: data });
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
      dispatch({ type: "WORKSPACE_REQUEST" });
      const res = await fetchWithAuth(
        `/api/workspaces/${id}`,
        {
          method: "GET",
        },
        state,
        dispatch
      );
      const response = await res.json();
      if (!res.ok)
        throw new Error(response.error || "Failed to fetch workspace details");
      dispatch({ type: "SET_CURRENT_WORKSPACE", payload: response });

      return response;
    } catch (error) {
      console.error("Error fetching workspace details:", error);
      return { error: error.message };
    } finally {
      dispatch({ type: "SET_WORKSPACES_DONE" });
    }
  }

  // Edit workspace
  async function editWorkspace(id, updates) {
    try {
      dispatch({ type: "WORKSPACE_REQUEST" });
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

      if (!res.ok)
        throw new Error(response.error || "Failed to update workspace");
      dispatch({ type: "UPDATE_WORKSPACE", payload: res });
      return response;
    } catch (error) {
      console.error("Error updating workspace:", error);
      return { error: error.message };
    } finally {
      dispatch({ type: "SET_WORKSPACES_DONE" });
    }
  }

  // Delete workspace
  async function deleteWorkspace(id) {
    try {
      dispatch({ type: "WORKSPACE_REQUEST" });

      const res = await fetchWithAuth(
        `/api/workspaces/${id}`,
        {
          method: "DELETE",
        },
        state,
        dispatch
      );

      const text = await res.text();
      const response = text ? JSON.parse(text) : {};

      if (!res.ok)
        throw new Error(response.error || "Failed to delete workspace");
      dispatch({ type: "DELETE_WORKSPACE", payload: id });
      return response;
    } catch (error) {
      console.error("Error deleting workspace:", error);
      return { error: error.message };
    } finally {
      dispatch({ type: "SET_WORKSPACES_DONE" });
    }
  }

  return {
    workspaces: state.workspaces,
    currentWorkspace: state.currentWorkspace,
    getWorkspaces,
    createWorkspace,
    getWorkspaceById,
    editWorkspace,
    deleteWorkspace,
  };
}
