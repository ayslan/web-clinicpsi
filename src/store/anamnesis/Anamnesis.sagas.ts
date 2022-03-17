import { call, put } from 'redux-saga/effects';
import { toast } from "react-toastify";
import { AnamnesisActions } from './Anamnesis.actions';
import { AnamnesisApi } from '../../data/Anamnesis.api';

export function* list() {
  try {
    const { data } = yield call(AnamnesisApi.list);
    yield put(AnamnesisActions.listSuccess(data.data));
  } catch (e) {
    const error = e.errors && e.errors.length ? e.errors[0].Message : 'Erro ao carregar Anamnesis';
    toast.error(error);
    yield put(AnamnesisActions.defaultFailure(error));
  }
}

// export function* register({ payload }: RegisterAction) {
//   try {
//     const { data } = yield call(ClientApi.register, payload);
//     yield put(ClientActions.registerSuccess(data.data));
//     toast.success('Cliente cadastrado com sucesso!');
//   } catch (e) {
//     const error = e.errors && e.errors.length ? e.errors[0].Message : 'Erro ao cadastrar cliente';
//     toast.error(error);
//     yield put(ClientActions.defaultFailure(error));
//   }
// }

// export function* update({ payload }: UpdateAction) {
//   try {
//     const { data } = yield call(ClientApi.update, payload);
//     yield put(ClientActions.updateSuccess(data.data));
//     toast.success('Cliente atualizado com sucesso!');
//   } catch (e) {
//     const error = e.errors && e.errors.length ? e.errors[0].Message : 'Erro ao atualizar cliente';
//     toast.error(error);
//     yield put(ClientActions.defaultFailure(error));
//   }
// }