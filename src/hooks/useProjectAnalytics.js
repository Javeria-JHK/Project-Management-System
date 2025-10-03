
import { useStore } from "./useStore";
import { fetchWithAuth } from "../api/fetchWithAuth";

export function useProjectAnalytics() {
      const { state, dispatch } = useStore();



   async function  getProjectAnalytics(projectId)  {
        try {
          const res = await fetchWithAuth(
            `api/analytics/project/${projectId}`,
            { method: "GET" },
            state,
            dispatch
          );
    
          const response = await res.json();
          if (!res.ok) throw new Error(response.error || "Failed to fetch analytics");
          console.log("response for analytics:", response.data); 
    
          dispatch({
          type: "SET_PROJECT_ANALYTICS",
          payload: response.data ,
        });
          return response.data;
        } catch (error) {
          console.error("Error fetching analytics:", error);
          return { error: error.message };
        }


  };

  return {  getProjectAnalytics, analytics:state.projectAnalytics };
}
