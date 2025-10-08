import { ANALYTICS_ACTIONS } from "../actionTypes";

export const analyticsInitialState = {
  projectAnalytics: {},
  isAnalyticsLoading: false,
  error: null,
};

export function analyticsReducer(state, action) {
  switch (action.type) {
    case ANALYTICS_ACTIONS.ANALYTICS_REQUEST:
      return { ...state, isAnalyticsLoading: true, error: null };

    case ANALYTICS_ACTIONS.SET_PROJECT_ANALYTICS:
      return {
        ...state,
        projectAnalytics: action.payload,
        isAnalyticsLoading: false,
      };

    case ANALYTICS_ACTIONS.ANALYTICS_FAILURE:
      return { ...state, isAnalyticsLoading: false, error: action.payload };

    default:
      return state;
  }
}
