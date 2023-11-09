import {IUser} from "../../../app/models/user";
import * as fromAuthActions from "./auth.actions";

export const initialState: AuthInitialState = {
  user: null,
  accessToken: null,
  isLoading: false,
  error: null
}

export interface AuthInitialState {
  user: IUser | null
  accessToken: string | null
  isLoading: boolean
  error: string | null
}

export function authReducer(state: AuthInitialState = initialState, action: fromAuthActions.AuthActions): AuthInitialState {
  switch (action.type) {
    case fromAuthActions.LOGIN:
      return {...state, isLoading: true};
    case fromAuthActions.LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: action.payload.user,
      }
    case fromAuthActions.LOGIN_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload.error
      }
    case fromAuthActions.AUTO_LOGIN_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload.error
      }
    case fromAuthActions.LOGOUT:
      return {...state, isLoading: true};
    case fromAuthActions.LOGOUT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: null
      }
    case fromAuthActions.REGISTER:
      return {...state, isLoading: true};
    case fromAuthActions.REGISTER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: action.payload.response.user,
      }
    case fromAuthActions.REGISTER_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload.error
      }
    default:
      return state;
  }
}
