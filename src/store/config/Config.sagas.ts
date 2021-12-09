import { call, put } from 'redux-saga/effects';
import { toast } from "react-toastify";
import { ConfigActions } from './Config.actions';
import { ConfigApi } from '../../data/Config.api';

export function* listInsurance() {
  try {
    const { data } = yield call(ConfigApi.listInsurance);
    yield put(ConfigActions.listInsuranceSuccess(data.data));
  } catch (e) {
    const error = e.errors && e.errors.length ? e.errors[0].Message : 'Erro ao carregar convênios';
    toast.error(error);
    yield put(ConfigActions.defaultFailure(error));
  }
}