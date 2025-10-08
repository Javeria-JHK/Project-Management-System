import { useStore } from "./useStore";
import { fetchWithAuth } from "../api/fetchWithAuth";
import {COMMENT_ACTIONS} from "../context/store/actionTypes";
export function useComments() {
  const { state, dispatch } = useStore();
  const {comment} = state;

  // 🔹 Get all comments for a task
  async function getComments(taskId) {
    try {
      dispatch({ type: "COMMENT_REQUEST" });

      const res = await fetchWithAuth(
        `/api/tasks/${taskId}/comments`,
        { method: "GET" },
        state,
        dispatch
      );

      const response = await res.json();
      if (!res.ok) throw new Error(response.error || "Failed to fetch comments");

      dispatch({ type: COMMENT_ACTIONS.SET_COMMENTS, payload: response.data });
      return response.data;
    } catch (error) {
      console.error("Error fetching comments:", error);
      return { error: error.message };
    } finally {
      dispatch({ type: COMMENT_ACTIONS.COMMENT_DONE });
    }
  }

  // 🔹 Add a comment
  async function createComment(taskId, content) {
    try {
      dispatch({ type: COMMENT_ACTIONS.COMMENT_REQUEST });

      const res = await fetchWithAuth(
        `/api/tasks/comments`,
        {
          method: "POST",
          body: JSON.stringify({taskId, content }),
        },
        state,
        dispatch
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to create comment");

      dispatch({ type:COMMENT_ACTIONS.ADD_COMMENT, payload: data });
      return data;
    } catch (error) {
      console.error("Error creating comment:", error);
      return { error: error.message };
    } finally {
      dispatch({ type: COMMENT_ACTIONS.COMMENT_DONE });
    }
  }

  // 🔹 Edit a comment
  async function editComment(commentId, updates) {
    try {
      dispatch({ type: COMMENT_ACTIONS.COMMENT_REQUEST });

      const res = await fetchWithAuth(
        `/api/comments/${commentId}`,
        {
          method: "PUT",
          body: JSON.stringify(updates),
        },
        state,
        dispatch
      );

      const response = await res.json();
      if (!res.ok) throw new Error(response.error || "Failed to update comment");

      dispatch({ type: COMMENT_ACTIONS.UPDATE_COMMENT, payload: response });
      return response;
    } catch (error) {
      console.error("Error updating comment:", error);
      return { error: error.message };
    } finally {
      dispatch({ type: COMMENT_ACTIONS.COMMENT_DONE });
    }
  }

  // 🔹 Delete a comment
  async function deleteComment(commentId) {
    try {
      dispatch({ type: COMMENT_ACTIONS.COMMENT_REQUEST});

      const res = await fetchWithAuth(
        `/api/comments/${commentId}`,
        { method: "DELETE" },
        state,
        dispatch
      );

      if (!res.ok) {
        const response = await res.json();
        throw new Error(response.error || "Failed to delete comment");
      }

      dispatch({ type: COMMENT_ACTIONS.DELETE_COMMENT, payload: commentId });
      return { success: true };
    } catch (error) {
      console.error("Error deleting comment:", error);
      return { error: error.message };
    } finally {
      dispatch({ type: COMMENT_ACTIONS.COMMENT_DONE });
    }
  }

  return {
    comments: comment.comments,
    getComments,
    createComment,
    editComment,
    deleteComment,
  };
}
