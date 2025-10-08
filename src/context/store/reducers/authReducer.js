import { AUTH_ACTIONS } from "../actionTypes";

export const authInitialState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  isSigninLoading: false,
  isSignupLoading: false,
  error: null,
  isLoggingOut:false,
};

export function authReducer(state, action) {
  switch (action.type) {
    case AUTH_ACTIONS.LOGIN_REQUEST:
      return { ...state, isSigninLoading: true, error: null };

    case AUTH_ACTIONS.REGISTER_REQUEST:
      return { ...state, isSignupLoading: true, error: null };

    case AUTH_ACTIONS.LOGIN_SUCCESS:
      return { ...state, ...action.payload, isSigninLoading: false, error: null };

    case AUTH_ACTIONS.REGISTER_SUCCESS:
      return { ...state, ...action.payload, isSignupLoading: false, error: null };

    case AUTH_ACTIONS.LOGIN_FAILURE:
      return { ...state, isSigninLoading: false, error: action.payload };

    case AUTH_ACTIONS.REGISTER_FAILURE:
      return { ...state, isSignupLoading: false, error: action.payload };

    case AUTH_ACTIONS.LOGOUT:
      return { ...authInitialState };
    case AUTH_ACTIONS.LOGOUT_REQUEST:
      return { ...state,isLoggingOut:true };

    case AUTH_ACTIONS.REFRESH_TOKEN_SUCCESS:
      return { ...state, ...action.payload };

    default:
      return state;
  }
}
