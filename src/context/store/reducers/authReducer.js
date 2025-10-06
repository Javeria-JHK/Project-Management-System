export const authInitialState = {
  user: null,
  accessToken: null,
  refreshToken: null,

  isSigninLoading:false,
  isSignupLoading: false,
  error: null,
};

export function authReducer(state, action) {
  switch (action.type) {
    case "LOGIN_REQUEST":
       return { ...state, isSigninLoading: true, error: null };
    case "REGISTER_REQUEST":
      return { ...state, isSignupLoading: true, error: null };

    case "LOGIN_SUCCESS":
      return { ...state, ...action.payload, isSigninLoading: false, error: null };
    case "REGISTER_SUCCESS":
      return { ...state, ...action.payload, isSignupLoading: false, error: null };

    case "LOGIN_FAILURE":
       return { ...state, isSigninLoading: false, error: action.payload };
    case "REGISTER_FAILURE":
      return { ...state, isSignupLoading: false, error: action.payload };

    case "LOGOUT":
      return { ...authInitialState };

    case "REFRESH_TOKEN_SUCCESS":
      return { ...state, ...action.payload };

    default:
      return state;
  }
}
