import { useStore } from "./useStore";
import { fetchWithAuth } from "../api/fetchWithAuth";

export function useProjects() {
  const { state, dispatch } = useStore();

    // 🔹 Get all projects for a workspace
  async function getProjects() {
    try {
      dispatch({ type: "PROJECT_REQUEST" });

      const res = await fetchWithAuth(
        'api/projects',
        { method: "GET" },
        state,
        dispatch
      );

      const response = await res.json();
      if (!res.ok) throw new Error(response.error || "Failed to fetch projects");

      dispatch({ type: "SET_PROJECTS", payload: response.data });
      return response.data;
    } catch (error) {
      console.error("Error fetching projects:", error);
      return { error: error.message };
    } finally {
      dispatch({ type: "PROJECTS_DONE" });
    }
  }

 // 🔹 Create a new project
  async function createProject(workspace_id, name, description) {
    try {
        dispatch({ type: "PROJECT_REQUEST" });
      const res = await fetchWithAuth(
        `/api/projects`,
        {
          method: "POST",
          body: JSON.stringify({ name, description ,workspace_id}),
        },
        state,
        dispatch
      );

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to create project");
      }

      dispatch({ type: "ADD_PROJECT", payload: data });
      return data;
    } catch (error) {
      console.error("Error creating project:", error);
      return { error: error.message };
    } finally {
      dispatch({ type: "PROJECTS_DONE" });
    }
  }

  // 🔹 Get project by ID
  async function getProjectById(projectId) {
    try {
        dispatch({ type: "PROJECT_REQUEST" });
      const res = await fetchWithAuth(
        `/api/projects/${projectId}`,
        { method: "GET" },
        state,
        dispatch
      );

      const response = await res.json();
      if (!res.ok) throw new Error(response.error || "Failed to fetch project");



      dispatch({ type: "SET_CURRENT_PROJECT", payload: response.data });
  
      return response;
    } catch (error) {
      console.error("Error fetching project details:", error);
      return { error: error.message };
    } finally {
      dispatch({ type: "PROJECTS_DONE" });
    }
  }

  // 🔹 Update project
  async function editProject( projectId, updates) {
    try {
        dispatch({ type: "PROJECT_REQUEST" });
      const res = await fetchWithAuth(
        `/api/projects/${projectId}`,
        {
          method: "PUT",
          body: JSON.stringify(updates),
        },
        state,
        dispatch
      );

      const text = await res.text();
      const response = text ? JSON.parse(text) : {};

      if (!res.ok) throw new Error(response.error || "Failed to update project");

      dispatch({ type: "UPDATE_PROJECT", payload: response });
      return response;
    } catch (error) {
      console.error("Error updating project:", error);
      return { error: error.message };
    } finally {
      dispatch({ type: "PROJECTS_DONE" });
    }
  }

  // 🔹 Delete project
  async function deleteProject(projectId) {
    try {
        dispatch({ type: "PROJECT_REQUEST" });
      const res = await fetchWithAuth(
        `/api/projects/${projectId}`,
        { method: "DELETE" },
        state,
        dispatch
      );

      const text = await res.text();
      const response = text ? JSON.parse(text) : {};

      if (!res.ok) throw new Error(response.error || "Failed to delete project");

      dispatch({ type: "DELETE_PROJECT", payload: projectId });
      return response;
    } catch (error) {
      console.error("Error deleting project:", error);
      return { error: error.message };
    } finally {
      dispatch({ type: "PROJECTS_DONE" });
    }
  }




  return {
    projects: state.projects,
    currentProject: state.currentProject,
    getProjects,
    createProject,
    getProjectById,
    editProject,
    deleteProject,

  };
}