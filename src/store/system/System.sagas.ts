import { call, put } from 'redux-saga/effects';
import { toast } from "react-toastify";
import { SystemApi } from '../../data/System.api';
import { SystemActions } from './System.actions';

export function* listCities() {
  try {
    const { data } = yield call(SystemApi.listCities);
    yield put(SystemActions.listCitiesSuccess(data.data));
  } catch (e) {
    const error = e.errors && e.errors.length ? e.errors[0].Message : 'Erro ao carregar cidades';
    toast.error(error);
    yield put(SystemActions.defaultFailure(error));
  }
}

export function* listCoutries() {
  try {
    const { data } = yield call(SystemApi.listCoutries);
    yield put(SystemActions.listCoutriesSuccess(data.data));
  } catch (e) {
    const error = e.errors && e.errors.length ? e.errors[0].Message : 'Erro ao carregar países';
    toast.error(error);
    yield put(SystemActions.defaultFailure(error));
  }
}