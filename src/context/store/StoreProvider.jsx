import StoreContext from "./StoreContext";
import { useReducer } from "react";

const initialState = {
  auth: {
    user: null,
    accessToken: null,
    refreshToken: null,
  },
  analytics: {},
  workspaces: [], //  workspaces
  activeWorkspaceId: "Select Workspace",
  isWorkspaceLoading: false,
  projects: [],
  currentProject: null,
  isProjectLoading: false,
  projectError: null,
  isTaskLoading: false,
  currentTask: null,
  tasks: [], // tasks of project
  userTasks: [], // tasks assigned to the user
  isCommentLoading: false,
  comments: [], // comments of task
  isLoading: false,
  error: null,
};

function reducer(state, action) {
  switch (action.type) {
    // Auth login
    case "LOGIN_REQUEST":
      return { ...state, isLoading: true, error: null };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        auth: { ...action.payload },
        isLoading: false,
        error: null,
      };
    case "LOGIN_FAILURE":
      return { ...state, isLoading: false, error: action.payload };

    case "REGISTER_REQUEST":
      return { ...state, isLoading: true, error: null };
    case "REGISTER_SUCCESS":
      return {
        ...state,
        auth: { ...action.payload },
        isLoading: false,
        error: null,
      };
    case "REGISTER_FAILURE":
      return { ...state, isLoading: false, error: action.payload };

    case "LOGOUT":
      return {
        ...state,
        auth: { user: null, accessToken: null, refreshToken: null },
      };

    case "REFRESH_TOKEN_SUCCESS":
      return { ...state, auth: { ...state.auth, ...action.payload } };

    case "WORKSPACE_REQUEST":
      return { ...state, isWorkspaceLoading: true, error: null };

    case "SET_WORKSPACES":
      return {
        ...state,
        workspaces: action.payload,
        isWorkspaceLoading: false,
        error: null,
      };

    case "ADD_WORKSPACE":
      return {
        ...state,
        workspaces: [...state.workspaces, action.payload],
        isWorkspaceLoading: false,
        error: null,
      };

    case "WORKSPACE_FAILURE":
      return { ...state, isWorkspaceLoading: false, error: action.payload };

    case "DELETE_WORKSPACE":
      return {
        ...state,
        workspaces: state.workspaces.filter((ws) => ws.id !== action.payload),
        isWorkspaceLoading: false,
        error: null,
      };
    case "SET_WORKSPACES_DONE":
      return { ...state, isWorkspaceLoading: false };

    case "EDIT_WORKSPACE":
      return {
        ...state,
        workspaces: state.workspaces.map((ws) =>
          ws.id === action.payload.id ? { ...ws, ...action.payload } : ws
        ),
        isWorkspaceLoading: false,
        error: null,
      };

    case "SET_ACTIVE_WORKSPACE":
      return {
        ...state,
        activeWorkspaceId: action.payload,
      };

    // ---------- PROJECTS ----------

    case "PROJECT_REQUEST":
      return {
        ...state,
        isProjectLoading: true,
        projectError: null,
      };

    case "SET_PROJECTS":
      return {
        ...state,
        projects: action.payload,
        isProjectLoading: false,
      };

    case "SET_CURRENT_PROJECT":
      return {
        ...state,
        currentProject: action.payload,
        isProjectLoading: false,
      };

    case "ADD_PROJECT":
      return {
        ...state,
        projects: [...state.projects, action.payload],
        isProjectLoading: false,
      };

    case "UPDATE_PROJECT":
      return {
        ...state,
        projects: state.projects.map((p) =>
          p.id === action.payload.id ? action.payload : p
        ),
        isProjectLoading: false,
      };

    case "DELETE_PROJECT":
      return {
        ...state,
        projects: state.projects.filter((p) => p.id !== action.payload),
        isProjectLoading: false,
      };

    case "PROJECT_ERROR":
      return {
        ...state,
        projectError: action.payload,
        isProjectLoading: false,
      };

    case "PROJECTS_DONE":
      return {
        ...state,
        isProjectLoading: false,
      };

    // ---------- TASKS ----------

    case "TASK_REQUEST":
      return { ...state, isTaskLoading: true, error: null };

    case "TASKS_DONE":
      return { ...state, isTaskLoading: false };

    case "SET_TASKS":
      return { ...state, tasks: action.payload };

    case "ADD_TASK":
      return { ...state, tasks: [...(state.tasks || []), action.payload] };

    case "UPDATE_TASK":
      return {
        ...state,
        tasks: state.tasks.map((t) =>
          t.id === action.payload.id ? { ...t, ...action.payload } : t
        ),
        currentTask:
          state.currentTask && state.currentTask.id === action.payload.id
            ? { ...state.currentTask, ...action.payload }
            : state.currentTask,
      };

    case "DELETE_TASK":
      return {
        ...state,
        tasks: state.tasks.filter((t) => t.id !== action.payload),
        currentTask:
          state.currentTask && state.currentTask.id === action.payload
            ? null
            : state.currentTask,
      };

    case "SET_USER_TASKS":
      return { ...state, userTasks: action.payload };

    // ---------- COMMENTS ----------

    case "COMMENT_REQUEST":
      return { ...state, isCommentLoading: true, error: null };

    case "COMMENT_DONE":
      return { ...state, isCommentLoading: false };

    case "SET_COMMENTS":
      return { ...state, comments: action.payload };

    case "ADD_COMMENT":
      return {
        ...state,
        comments: [...(state.comments || []), action.payload],
      };

    case "UPDATE_COMMENT":
      return {
        ...state,
        comments: state.comments.map((c) =>
          c.id === action.payload.id ? { ...c, ...action.payload } : c
        ),
      };

    case "DELETE_COMMENT":
      return {
        ...state,
        comments: state.comments.filter((c) => c.id !== action.payload),
      };

    case "SET_PROJECT_ANALYTICS":
      return {
        ...state,
        projectAnalytics: action.payload,
      };

    case "LOADING":
      return { ...state, isLoading: true, error: null };
    case "SUCCESS":
      return { ...state, isLoading: false };
    case "ERROR":
      return { ...state, isLoading: false, error: action.payload };

    default:
      return state;
  }
}

export function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
}
