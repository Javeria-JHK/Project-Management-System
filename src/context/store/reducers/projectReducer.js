import { PROJECT_ACTIONS } from "../actionTypes";

export const projectInitialState = {
  projects: [],
  currentProject: null,
  isProjectLoading: false,
  error: null,
};

export function projectReducer(state, action) {
  switch (action.type) {
    case PROJECT_ACTIONS.PROJECT_REQUEST:
      return { ...state, isProjectLoading: true, error: null };

    case PROJECT_ACTIONS.SET_PROJECTS:
      return { ...state, projects: action.payload, isProjectLoading: false };

    case PROJECT_ACTIONS.SET_CURRENT_PROJECT:
      return { ...state, currentProject: action.payload, isProjectLoading: false };

    case PROJECT_ACTIONS.ADD_PROJECT:
      return {
        ...state,
        projects: [...state.projects, action.payload],
        isProjectLoading: false,
      };

    case PROJECT_ACTIONS.UPDATE_PROJECT:
      return {
        ...state,
        projects: state.projects.map((p) =>
          p.id === action.payload.id ? action.payload : p
        ),
      };

    case PROJECT_ACTIONS.DELETE_PROJECT:
      return {
        ...state,
        projects: state.projects.filter((p) => p.id !== action.payload),
      };

    case PROJECT_ACTIONS.PROJECT_ERROR:
      return { ...state, isProjectLoading: false, error: action.payload };

    default:
      return state;
  }
}
