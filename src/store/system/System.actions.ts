import { ICity } from "../../data/interfaces/system/ICity";
import { ICountry } from "../../data/interfaces/system/ICountry";
import { Action, ActionsUnion, createAction } from "../../utils/actionHelper";

export enum SystemActionKeys {
  CITIES_LIST_REQUEST = 'CITIES_LIST_REQUEST',
  CITIES_LIST_SUCCESS = 'CITIES_LIST_SUCCESS',

  COUNTRIES_LIST_REQUEST = 'COUNTRIES_LIST_REQUEST',
  COUNTRIES_LIST_SUCCESS = 'COUNTRIES_LIST_SUCCESS',

  DEFAULT_FAILED = 'DEFAULT_FAILED',
}

export const SystemActions = {
  listCities: (): ListCitiesAction => createAction(SystemActionKeys.CITIES_LIST_REQUEST),
  listCitiesSuccess: (response: ICity[]): ListCitiesSuccessAction => createAction(SystemActionKeys.CITIES_LIST_SUCCESS, response),

  listCountries: (): ListCoutriesAction => createAction(SystemActionKeys.COUNTRIES_LIST_REQUEST),
  listCoutriesSuccess: (response: ICountry[]): ListCoutriesSuccessAction => createAction(SystemActionKeys.COUNTRIES_LIST_SUCCESS, response),

  defaultFailure: (err: string): DefaultFailureAction => createAction(SystemActionKeys.DEFAULT_FAILED, err),
}

export type SystemActionUnion = ActionsUnion<typeof SystemActions>;

export type ListCitiesAction = Action<SystemActionKeys.CITIES_LIST_REQUEST>;
export type ListCitiesSuccessAction = Action<SystemActionKeys.CITIES_LIST_SUCCESS, ICity[]>;

export type ListCoutriesAction = Action<SystemActionKeys.COUNTRIES_LIST_REQUEST>;
export type ListCoutriesSuccessAction = Action<SystemActionKeys.COUNTRIES_LIST_SUCCESS, ICountry[]>;

export type DefaultFailureAction = Action<SystemActionKeys.DEFAULT_FAILED, string>;
