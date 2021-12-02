import { IGlobalReducerState } from '../base/interface/IGlobalReducerState';
import { createSelector } from 'reselect';

const isLoggedSelector = (state: IGlobalReducerState) => state.auth.isLogged;

const isAuthenticatedSelector = createSelector(isLoggedSelector, (isLogged: boolean) => isLogged);

export { isAuthenticatedSelector };
