import {Action} from "@ngrx/store";
import {IUser} from "../../../app/models/user";
import {AuthResponseData} from "../../../lib/services/auth.service";

export const LOGIN = "[Auth] Login";
export const LOGIN_SUCCESS = "[Auth] Login Success";
export const LOGIN_ERROR = "[Auth] Login Error";
export const AUTO_LOGIN = "[Auth] Auto Login";
export const AUTO_LOGIN_ERROR = "[Auth] Auto Login Error";
export const LOGOUT = "[Auth] Logout";
export const LOGOUT_SUCCESS = "[Auth] Logout Success";
export const REGISTER = "[Auth] Register";
export const REGISTER_SUCCESS = "[Auth] Register Success";
export const REGISTER_ERROR = "[Auth] Register Error";

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

export class AutoLogin implements Action {
  readonly type = AUTO_LOGIN;
}

export class AutoLoginError implements Action {
  readonly type = AUTO_LOGIN_ERROR;

  constructor(public payload: { error: string }) {
  }
}

export class Logout implements Action {
  readonly type = LOGOUT;

  constructor() {
  }
}

export class LogoutSuccess implements Action {
  readonly type = LOGOUT_SUCCESS;

  constructor() {
  }
}

export class Register implements Action {
  readonly type = REGISTER;

  constructor(public payload: { user: IUser }) {
  }
}

export class RegisterSuccess implements Action {
  readonly type = REGISTER_SUCCESS;

  constructor(public payload: { response: AuthResponseData }) {
  }
}

export class RegisterError implements Action {
  readonly type = REGISTER_ERROR;

  constructor(public payload: { error: string }) {
  }
}


export type AuthActions =
  Login
  | LoginSuccess
  | LoginError
  | AutoLogin
  | AutoLoginError
  | Logout
  | LogoutSuccess
  | Register
  | RegisterSuccess
  | RegisterError
