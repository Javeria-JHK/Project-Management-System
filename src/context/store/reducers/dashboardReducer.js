import { DASHBOARD_ACTIONS } from "../actionTypes";

export const dashboardInitialState = {
  dashboardData: null,
  isDashboardLoading: false,
  error: null,
};

export function dashboardReducer(state, action) {
  switch (action.type) {
    case DASHBOARD_ACTIONS.DASHBOARD_REQUEST:
      return { ...state, isDashboardLoading: true, error: null };

    case DASHBOARD_ACTIONS.SET_DASHBOARD_DATA:
      return { ...state, dashboardData: action.payload, isDashboardLoading: false };

    case DASHBOARD_ACTIONS.DASHBOARD_FAILURE:
      return { ...state, isDashboardLoading: false, error: action.payload };

    default:
      return state;
  }
}