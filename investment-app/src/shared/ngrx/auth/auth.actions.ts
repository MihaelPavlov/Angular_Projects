import {Action} from "@ngrx/store";
import {IUser} from "../../../app/models/user";

export const LOGIN = "[Auth] Login";
export const LOGIN_SUCCESS = "[Auth] Login Success";
export const LOGIN_ERROR = "[Auth] Login Error";

export class Login implements Action {
  readonly type = LOGIN;

  constructor(public payload: { email: string, password: string }) {
  }
}

export class LoginSuccess implements Action {
  readonly type = LOGIN_SUCCESS;

  constructor(public payload: { user: IUser }) {
  }
}

export class LoginError implements Action {
  readonly type = LOGIN_ERROR;

  constructor(public payload: { error: string }) {
  }
}

export type AuthActions =
  Login
  | LoginSuccess
  | LoginError
