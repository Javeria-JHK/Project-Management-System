export const commentInitialState = {
  comments: [],
  isCommentLoading: false,
  error: null,
};

export function commentReducer(state, action) {
  switch (action.type) {
    case "COMMENT_REQUEST":
      return { ...state, isCommentLoading: true, error: null };

    case "SET_COMMENTS":
      return { ...state, comments: action.payload, isCommentLoading: false };

    case "ADD_COMMENT":
      return {
        ...state,
        comments: [...(state.comments || []), action.payload],
        isCommentLoading: false,
      };

    case "UPDATE_COMMENT":
      return {
        ...state,
        comments: state.comments.map((c) =>
          c.id === action.payload.id ? { ...c, ...action.payload } : c
        ),
        isCommentLoading: false,
      };

    case "DELETE_COMMENT":
      return {
        ...state,
        comments: state.comments.filter((c) => c.id !== action.payload),
        isCommentLoading: false,
      };

    case "COMMENT_FAILURE":
      return { ...state, isCommentLoading: false, error: action.payload };

    default:
      return state;
  }
}
