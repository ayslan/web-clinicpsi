import { call, put } from 'redux-saga/effects';
import { history } from '../';
import { toast } from "react-toastify";
import { ClientApi } from '../../data/Client.api';
import { ClientActions } from './Client.actions';

export function* list() {
  try {
    const { data } = yield call(ClientApi.list);
    yield put(ClientActions.listSuccess(data.data));
  } catch (e) {
    const error = e.errors && e.errors.length ? e.errors[0].Message : 'Erro ao carregar clientes';
    toast.error(error);
    yield put(ClientActions.defaultFailure(error));
  }
}