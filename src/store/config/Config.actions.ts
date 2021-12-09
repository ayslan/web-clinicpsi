import { IInsurance } from "../../data/interfaces/config/IInsurance";
import { Action, ActionsUnion, createAction } from "../../utils/actionHelper";

export enum ConfigActionKeys {
  INSURANCE_LIST_REQUEST = 'INSURANCE_LIST_REQUEST',
  INSURANCE_LIST_SUCCESS = 'INSURANCE_LIST_SUCCESS',

  DEFAULT_FAILED = 'DEFAULT_FAILED',
}

export const ConfigActions = {
  listInsurance: (): ListInsuranceAction => createAction(ConfigActionKeys.INSURANCE_LIST_REQUEST),
  listInsuranceSuccess: (response: IInsurance[]): ListInsuranceSuccessAction => createAction(ConfigActionKeys.INSURANCE_LIST_SUCCESS, response),

  defaultFailure: (err: string): DefaultFailureAction => createAction(ConfigActionKeys.DEFAULT_FAILED, err),
}

export type ConfigActionUnion = ActionsUnion<typeof ConfigActions>;

export type ListInsuranceAction = Action<ConfigActionKeys.INSURANCE_LIST_REQUEST>;
export type ListInsuranceSuccessAction = Action<ConfigActionKeys.INSURANCE_LIST_SUCCESS, IInsurance[]>;

export type DefaultFailureAction = Action<ConfigActionKeys.DEFAULT_FAILED, string>;
