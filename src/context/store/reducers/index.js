import { authReducer, authInitialState } from "./authReducer";
import { workspaceReducer, workspaceInitialState } from "./workspaceReducer";
import { projectReducer, projectInitialState } from "./projectReducer";
import { taskReducer, taskInitialState } from "./taskReducer";
import { commentReducer, commentInitialState } from "./commentReducer";
import { analyticsReducer, analyticsInitialState } from "./analyticsReducer";
import { dashboardReducer, dashboardInitialState } from "./dashboardReducer";

export const initialState = {
  auth: authInitialState,
  workspace: workspaceInitialState,
  project: projectInitialState,
  task: taskInitialState,
  comment: commentInitialState,
  analytics: analyticsInitialState,
  dashboard:dashboardInitialState,
};

export function rootReducer(state, action) {
  return {
    auth: authReducer(state.auth, action),
    workspace: workspaceReducer(state.workspace, action),
    project: projectReducer(state.project, action),
    task: taskReducer(state.task, action),
    comment: commentReducer(state.comment, action),
    analytics: analyticsReducer(state.analytics, action),
    dashboard: dashboardReducer(state.dashboard,action),
  };
}
