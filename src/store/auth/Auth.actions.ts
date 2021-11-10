import { ILoginRequest, ILoginResponse } from "../../data/interfaces/auth/ILogin";
import { IRegisterRequest } from "../../data/interfaces/auth/IRegister";
import { Action, ActionsUnion, createAction } from "../../utils/actionHelper";

export enum AuthActionKeys {
  LOGIN_REQUEST = 'LOGIN_REQUEST',
  LOGIN_SUCCESS = 'LOGIN_SUCCESS',

  REGISTER_REQUEST = 'REGISTER_REQUEST',
  REGISTER_SUCCESS = 'REGISTER_SUCCESS',

  DEFAULT_FAILED = 'DEFAULT_FAILED',
}

export const AuthActions = {
  login: (request: ILoginRequest): LoginAction => createAction(AuthActionKeys.LOGIN_REQUEST, request),
  loginSuccess: (response: ILoginResponse): LoginSuccessAction => createAction(AuthActionKeys.LOGIN_SUCCESS, response),

  register: (request: IRegisterRequest): RegisterAction => createAction(AuthActionKeys.REGISTER_REQUEST, request),
  registerSuccess: (response: ILoginResponse): RegisterSuccessAction => createAction(AuthActionKeys.REGISTER_SUCCESS, response),

  defaultFailure: (err: string): DefaultFailureAction => createAction(AuthActionKeys.DEFAULT_FAILED, err),
}

export type AuthActionUnion = ActionsUnion<typeof AuthActions>;

export type LoginAction = Action<AuthActionKeys.LOGIN_REQUEST, ILoginRequest>;
export type LoginSuccessAction = Action<AuthActionKeys.LOGIN_SUCCESS, ILoginResponse>;

export type RegisterAction = Action<AuthActionKeys.REGISTER_REQUEST, IRegisterRequest>;
export type RegisterSuccessAction = Action<AuthActionKeys.REGISTER_SUCCESS, ILoginResponse>;

export type DefaultFailureAction = Action<AuthActionKeys.DEFAULT_FAILED, string>;
