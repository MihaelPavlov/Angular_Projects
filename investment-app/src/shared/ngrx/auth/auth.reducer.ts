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
      console.log('from error reducer')
      return {
        ...state,
        isLoading: false,
        error: action.payload.error
      }
    default:
      return state;
  }
}
