import { useStore } from "./useStore";
import { fetchWithAuth } from "../api/fetchWithAuth";

export function useTasks() {
  const { state, dispatch } = useStore();

  // 🔹 Get all tasks for a project
  async function getTasksByProject(projectId) {
    try {
      dispatch({ type: "TASK_REQUEST" });

      const res = await fetchWithAuth(
        `/api/tasks/project/${projectId}`,
        { method: "GET" },
        state,
        dispatch
      );

      const response = await res.json();
      if (!res.ok) throw new Error(response.error || "Failed to fetch tasks");

      dispatch({ type: "SET_TASKS", payload: response.data });
      return response.data;
    } catch (error) {
      console.error("Error fetching tasks:", error);
      return { error: error.message };
    } finally {
      dispatch({ type: "TASKS_DONE" });
    }
  }

  // 🔹 Get all tasks for a user
  async function getTasksByUser(userId) {
    try {
        console.log("Fetching tasks for user ID:", userId);
      dispatch({ type: "TASK_REQUEST" });

      const res = await fetchWithAuth(
        `/api/tasks/assignee/${userId}`,
        { method: "GET" },
        state,
        dispatch
      );

      const response = await res.json();
      if (!res.ok) throw new Error(response.error || "Failed to fetch user tasks");

       dispatch({ type: "SET_USER_TASKS", payload: response.data });

      return response.data;
    } catch (error) {
      console.error("Error fetching user tasks:", error);
      return { error: error.message };
    } finally {
      dispatch({ type: "TASKS_DONE" });
    }
  }

  // 🔹 Get task by ID
  async function getTaskById(taskId) {
    try {
      dispatch({ type: "TASK_REQUEST" });

      const res = await fetchWithAuth(
        `/api/tasks/${taskId}`,
        { method: "GET" },
        state,
        dispatch
      );

      const response = await res.json();
      if (!res.ok) throw new Error(response.error || "Failed to fetch task");

      dispatch({ type: "SET_CURRENT_TASK", payload: response });
      return response;
    } catch (error) {
      console.error("Error fetching task:", error);
      return { error: error.message };
    } finally {
      dispatch({ type: "TASKS_DONE" });
    }
  }

  // 🔹 Create a new task
  async function createTask(projectId, taskData) {
    try {
      dispatch({ type: "TASK_REQUEST" });

      const res = await fetchWithAuth(
        `/api/tasks`,
        {
          method: "POST",
          body: JSON.stringify(taskData),
        },
        state,
        dispatch
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to create task");

      dispatch({ type: "ADD_TASK", payload: data });
      return data;
    } catch (error) {
      console.error("Error creating task:", error);
      return { error: error.message };
    } finally {
      dispatch({ type: "TASKS_DONE" });
    }
  }

  // 🔹 Update task
  async function editTask(taskId, updates) {
    console.log("Updating task with ID:", taskId, "with updates:", updates);
    try {
      dispatch({ type: "TASK_REQUEST" });

      const res = await fetchWithAuth(
        `/api/tasks/${taskId}`,
        {
          method: "PUT",
          body: JSON.stringify(updates),
        },
        state,
        dispatch
      );

      const text = await res.text();
      const response = text ? JSON.parse(text) : {};

      if (!res.ok) throw new Error(response.error || "Failed to update task");

      dispatch({ type: "UPDATE_TASK", payload: response });
      return response;
    } catch (error) {
      console.error("Error updating task:", error);
      return { error: error.message };
    } finally {
      dispatch({ type: "TASKS_DONE" });
    }
  }

  // 🔹 Delete task
  async function deleteTask(taskId) {
    try {
      dispatch({ type: "TASK_REQUEST" });

      const res = await fetchWithAuth(
        `/api/tasks/${taskId}`,
        { method: "DELETE" },
        state,
        dispatch
      );

      const text = await res.text();
      const response = text ? JSON.parse(text) : {};

      if (!res.ok) throw new Error(response.error || "Failed to delete task");

      dispatch({ type: "DELETE_TASK", payload: taskId });
      return response;
    } catch (error) {
      console.error("Error deleting task:", error);
      return { error: error.message };
    } finally {
      dispatch({ type: "TASKS_DONE" });
    }
  }

  return {
    tasks: state.tasks,
    currentTask: state.currentTask,
    userTasks: state.userTasks,
    getTasksByProject,
    getTasksByUser,
    getTaskById,
    createTask,
    editTask,
    deleteTask,
  };
}
