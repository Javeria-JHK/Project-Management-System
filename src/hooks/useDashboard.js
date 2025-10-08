import { useStore } from "./useStore";
import { fetchWithAuth } from "../api/fetchWithAuth";
import { DASHBOARD_ACTIONS } from "../context/store/actionTypes";

export function useDashboard() {
  const { state, dispatch } = useStore();
  const { dashboard } = state;

  async function getDashboardData() {
    try {
      dispatch({ type: DASHBOARD_ACTIONS.DASHBOARD_REQUEST });

      const res = await fetchWithAuth(
        "/api/overview/dashboard",
        { method: "GET" },
        state,
        dispatch
      );

      const response = await res.json();
      if (!res.ok) throw new Error(response.error || "Failed to fetch dashboard data");

      dispatch({
        type: DASHBOARD_ACTIONS.SET_DASHBOARD_DATA,
        payload: response.data,
      });

      return response.data;
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      dispatch({
        type: DASHBOARD_ACTIONS.DASHBOARD_FAILURE,
        payload: error.message,
      });
      return { error: error.message };
    }
  }

  return {
    getDashboardData,
    dashboardData: dashboard.dashboardData,
    isDashboardDataLoading: dashboard.isDashboardLoading,
    error: dashboard.error,
  };
}