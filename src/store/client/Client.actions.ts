import { IClientResponse } from "../../data/interfaces/client/IClient";
import { Action, ActionsUnion, createAction } from "../../utils/actionHelper";

export enum ClientActionKeys {
  LIST_REQUEST = 'LIST_REQUEST',
  LIST_SUCCESS = 'LIST_SUCCESS',

  DEFAULT_FAILED = 'DEFAULT_FAILED',
}

export const ClientActions = {
  list: (): ListAction => createAction(ClientActionKeys.LIST_REQUEST),
  listSuccess: (response: IClientResponse[]): ListSuccessAction => createAction(ClientActionKeys.LIST_SUCCESS, response),

  defaultFailure: (err: string): DefaultFailureAction => createAction(ClientActionKeys.DEFAULT_FAILED, err),
}

export type ClientActionUnion = ActionsUnion<typeof ClientActions>;

export type ListAction = Action<ClientActionKeys.LIST_REQUEST>;
export type ListSuccessAction = Action<ClientActionKeys.LIST_SUCCESS, IClientResponse[]>;

export type DefaultFailureAction = Action<ClientActionKeys.DEFAULT_FAILED, string>;
