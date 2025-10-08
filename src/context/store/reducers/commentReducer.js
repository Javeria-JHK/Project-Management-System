import { COMMENT_ACTIONS } from "../actionTypes";

export const commentInitialState = {
  comments: [],
  isCommentLoading: false,
  error: null,
};

export function commentReducer(state, action) {
  switch (action.type) {
    case COMMENT_ACTIONS.COMMENT_REQUEST:
      return { ...state, isCommentLoading: true, error: null };

    case COMMENT_ACTIONS.SET_COMMENTS:
      return { ...state, comments: action.payload, isCommentLoading: false };

    case COMMENT_ACTIONS.ADD_COMMENT:
      return {
        ...state,
        comments: [...(state.comments || []), action.payload],
        isCommentLoading: false,
      };

    case COMMENT_ACTIONS.UPDATE_COMMENT:
      return {
        ...state,
        comments: state.comments.map((c) =>
          c.id === action.payload.id ? { ...c, ...action.payload } : c
        ),
        isCommentLoading: false,
      };

    case COMMENT_ACTIONS.DELETE_COMMENT:
      return {
        ...state,
        comments: state.comments.filter((c) => c.id !== action.payload),
        isCommentLoading: false,
      };

    case COMMENT_ACTIONS.COMMENT_FAILURE:
      return { ...state, isCommentLoading: false, error: action.payload };

    default:
      return state;
  }
}
