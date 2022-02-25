import { IClientResponse } from "../../data/interfaces/client/IClient";
import { Action, ActionsUnion, createAction } from "../../utils/actionHelper";

export enum ClientActionKeys {
  CLIENT_LIST_REQUEST = 'CLIENT_LIST_REQUEST',
  CLIENT_LIST_SUCCESS = 'CLIENT_LIST_SUCCESS',

  CLIENT_REGISTER_REQUEST = 'CLIENT_REGISTER_REQUEST',
  CLIENT_REGISTER_SUCCESS = 'CLIENT_REGISTER_SUCCESS',

  CLIENT_UPDATE_REQUEST = 'CLIENT_UPDATE_REQUEST',
  CLIENT_UPDATE_SUCCESS = 'CLIENT_UPDATE_SUCCESS',

  DEFAULT_FAILED = 'DEFAULT_FAILED',
}

export const ClientActions = {
  list: (): ListAction => createAction(ClientActionKeys.CLIENT_LIST_REQUEST),
  listSuccess: (response: IClientResponse[]): ListSuccessAction => createAction(ClientActionKeys.CLIENT_LIST_SUCCESS, response),

  register: (request: IClientResponse): RegisterAction => createAction(ClientActionKeys.CLIENT_REGISTER_REQUEST, request),
  registerSuccess: (response: IClientResponse): RegisterSuccessAction => createAction(ClientActionKeys.CLIENT_REGISTER_SUCCESS, response),

  update: (request: IClientResponse): UpdateAction => createAction(ClientActionKeys.CLIENT_UPDATE_REQUEST, request),
  updateSuccess: (response: IClientResponse): UpdateSuccessAction => createAction(ClientActionKeys.CLIENT_UPDATE_SUCCESS, response),

  defaultFailure: (err: string): DefaultFailureAction => createAction(ClientActionKeys.DEFAULT_FAILED, err),
}

export type ClientActionUnion = ActionsUnion<typeof ClientActions>;

export type ListAction = Action<ClientActionKeys.CLIENT_LIST_REQUEST>;
export type ListSuccessAction = Action<ClientActionKeys.CLIENT_LIST_SUCCESS, IClientResponse[]>;

export type RegisterAction = Action<ClientActionKeys.CLIENT_REGISTER_REQUEST, IClientResponse>;
export type RegisterSuccessAction = Action<ClientActionKeys.CLIENT_REGISTER_SUCCESS, IClientResponse>;

export type UpdateAction = Action<ClientActionKeys.CLIENT_UPDATE_REQUEST, IClientResponse>;
export type UpdateSuccessAction = Action<ClientActionKeys.CLIENT_UPDATE_SUCCESS, IClientResponse>;

export type DefaultFailureAction = Action<ClientActionKeys.DEFAULT_FAILED, string>;
