import { action } from "typesafe-actions";
import { ILoginRequest, ILoginResponse } from "../../data/interfaces/auth/ILogin";

export enum AuthActionKeys {
  AUTH_LOGIN_REQUEST = 'AUTH_LOGIN_REQUEST',
  AUTH_LOGIN_SUCCESS = 'AUTH_LOGIN_SUCCESS',
  
  REGISTER_REQUEST = 'REGISTER_REQUEST',
  REGISTER_SUCCESS = 'REGISTER_SUCCESS',
  
  DEFAULT_FAILED = 'AUTH_LOGIN_FAILED',
}

export const userLogin = (data: ILoginRequest) => action(AuthActionKeys.AUTH_LOGIN_REQUEST, { data });
export const userLoginSuccess = (data: ILoginResponse) => action(AuthActionKeys.AUTH_LOGIN_SUCCESS, { data });

export const defaultFailure = (data: string) => action(AuthActionKeys.DEFAULT_FAILED, { data });
