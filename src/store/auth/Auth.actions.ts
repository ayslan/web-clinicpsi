import { action } from "typesafe-actions";
import { ILoginRequest } from "../../data/interfaces/ILoginRequest";
import { ILoginResponse } from "../../data/interfaces/ILoginResponse";

export enum AuthActionKeys {
  AUTH_LOGIN_REQUEST = 'AUTH_LOGIN_REQUEST',
  AUTH_LOGIN_SUCCESS = 'AUTH_LOGIN_SUCCESS',
  AUTH_LOGIN_FAILED = 'AUTH_LOGIN_FAILED',
}

export const userLogin = (data: ILoginRequest) => action(AuthActionKeys.AUTH_LOGIN_REQUEST, { data });
export const userLoginSuccess = (data: ILoginResponse) => action(AuthActionKeys.AUTH_LOGIN_REQUEST, { data });
export const userLoginFailure = (data: string) => action(AuthActionKeys.AUTH_LOGIN_REQUEST, { data });
