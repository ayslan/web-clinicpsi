import { IAnamnesis } from "../../data/interfaces/anamnesis/IAnamnesis";
import { Action, ActionsUnion, createAction } from "../../utils/actionHelper";

export enum AnamnesisActionKeys {
  ANAMNESIS_LIST_REQUEST = 'ANAMNESIS_LIST_REQUEST',
  ANAMNESIS_LIST_SUCCESS = 'ANAMNESIS_LIST_SUCCESS',

  // ANAMNESIS_REGISTER_REQUEST = 'ANAMNESIS_REGISTER_REQUEST',
  // ANAMNESIS_REGISTER_SUCCESS = 'ANAMNESIS_REGISTER_SUCCESS',

  // ANAMNESIS_UPDATE_REQUEST = 'ANAMNESIS_UPDATE_REQUEST',
  // ANAMNESIS_UPDATE_SUCCESS = 'ANAMNESIS_UPDATE_SUCCESS',

  DEFAULT_FAILED = 'DEFAULT_FAILED',
}

export const AnamnesisActions = {
  list: (): ListAction => createAction(AnamnesisActionKeys.ANAMNESIS_LIST_REQUEST),
  listSuccess: (response: IAnamnesis[]): ListSuccessAction => createAction(AnamnesisActionKeys.ANAMNESIS_LIST_SUCCESS, response),

  // register: (request: IClientResponse): RegisterAction => createAction(ClientActionKeys.CLIENT_REGISTER_REQUEST, request),
  // registerSuccess: (response: IClientResponse): RegisterSuccessAction => createAction(ClientActionKeys.CLIENT_REGISTER_SUCCESS, response),

  // update: (request: IClientResponse): UpdateAction => createAction(ClientActionKeys.CLIENT_UPDATE_REQUEST, request),
  // updateSuccess: (response: IClientResponse): UpdateSuccessAction => createAction(ClientActionKeys.CLIENT_UPDATE_SUCCESS, response),

  defaultFailure: (err: string): DefaultFailureAction => createAction(AnamnesisActionKeys.DEFAULT_FAILED, err),
}

export type AnamnesisActionUnion = ActionsUnion<typeof AnamnesisActions>;

export type ListAction = Action<AnamnesisActionKeys.ANAMNESIS_LIST_REQUEST>;
export type ListSuccessAction = Action<AnamnesisActionKeys.ANAMNESIS_LIST_SUCCESS, IAnamnesis[]>;

// export type RegisterAction = Action<ClientActionKeys.CLIENT_REGISTER_REQUEST, IClientResponse>;
// export type RegisterSuccessAction = Action<ClientActionKeys.CLIENT_REGISTER_SUCCESS, IClientResponse>;

// export type UpdateAction = Action<ClientActionKeys.CLIENT_UPDATE_REQUEST, IClientResponse>;
// export type UpdateSuccessAction = Action<ClientActionKeys.CLIENT_UPDATE_SUCCESS, IClientResponse>;

export type DefaultFailureAction = Action<AnamnesisActionKeys.DEFAULT_FAILED, string>;
