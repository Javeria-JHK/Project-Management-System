import { WORKSPACE_ACTIONS } from "../actionTypes";

export const workspaceInitialState = {
  workspaces: [],
  activeWorkspaceId: "",
  isWorkspaceLoading: false,
  error: null,
};

export function workspaceReducer(state, action) {
  switch (action.type) {
    case WORKSPACE_ACTIONS.WORKSPACE_REQUEST:
      return { ...state, isWorkspaceLoading: true, error: null };

    case WORKSPACE_ACTIONS.SET_WORKSPACES:
      return {
        ...state,
        workspaces: action.payload,
        isWorkspaceLoading: false,
      };

    case WORKSPACE_ACTIONS.ADD_WORKSPACE:
      return {
        ...state,
        workspaces: [...state.workspaces, action.payload],
        isWorkspaceLoading: false,
      };

    case WORKSPACE_ACTIONS.EDIT_WORKSPACE:
      return {
        ...state,
        workspaces: state.workspaces.map((ws) =>
          ws.id === action.payload.id ? { ...ws, ...action.payload } : ws
        ),
        isWorkspaceLoading: false,
      };

    case WORKSPACE_ACTIONS.DELETE_WORKSPACE:
      return {
        ...state,
        workspaces: state.workspaces.filter((ws) => ws.id !== action.payload),
        isWorkspaceLoading: false,
      };

    case WORKSPACE_ACTIONS.SET_ACTIVE_WORKSPACE:
      return { ...state, activeWorkspaceId: action.payload };

    case WORKSPACE_ACTIONS.WORKSPACE_FAILURE:
      return { ...state, isWorkspaceLoading: false, error: action.payload };

    default:
      return state;
  }
}
