import { call, put } from 'redux-saga/effects';
import { history } from '../';
import { toast } from "react-toastify";
import { ClientApi } from '../../data/Client.api';
import { ClientActions, RegisterAction } from './Client.actions';

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

export function* register({ payload }: RegisterAction) {
  try {
    const { data } = yield call(ClientApi.register, payload);
    yield put(ClientActions.registerSuccess(data.data));
    toast.success('Cliente cadastrado com sucesso!');
    history.push('clients');
  } catch (e) {
    const error = e.errors && e.errors.length ? e.errors[0].Message : 'Erro ao cadastrar cliente';
    toast.error(error);
    yield put(ClientActions.defaultFailure(error));
  }
}