import { ILoginRequest } from "../../data/interfaces/ILoginRequest";
import { ILoginResponse } from "../../data/interfaces/ILoginResponse";
import { Action, ActionsUnion, createAction } from "../../utils/actionHelper";

export enum AuthActionKeys {
    AUTH_LOGIN_REQUEST = 'AUTH_LOGIN_REQUEST',
    AUTH_LOGIN_SUCCESS = 'AUTH_LOGIN_SUCCESS',
    AUTH_LOGIN_FAILED = 'AUTH_LOGIN_FAILED',
}

export const AuthActions = {
    userLogin: (userData: ILoginRequest): UserLoginAction =>
      createAction(AuthActionKeys.AUTH_LOGIN_REQUEST, userData),
    userLoginSuccess: (response: ILoginResponse): UserLoginSuccessAction =>
      createAction(AuthActionKeys.AUTH_LOGIN_SUCCESS, response),
    userLoginFailure: (err: string): UserLoginFailureAction =>
      createAction(AuthActionKeys.AUTH_LOGIN_FAILED, err),
}

export type AuthActionUnion = ActionsUnion<typeof AuthActions>;

export type UserLoginAction = Action<AuthActionKeys.AUTH_LOGIN_REQUEST, ILoginRequest>;
export type UserLoginSuccessAction = Action<AuthActionKeys.AUTH_LOGIN_SUCCESS, ILoginResponse>;
export type UserLoginFailureAction = Action<AuthActionKeys.AUTH_LOGIN_FAILED, string>;
