import { call, put } from 'redux-saga/effects';
import { history } from '../';
import { AuthApi } from '../../data/Auth.api';
import { AuthUtils } from '../../utils/AuthUtils';
import { AuthActions, LoginAction, LoginSuccessAction, RegisterAction } from './Auth.actions';

export function* signIn({ payload }: LoginAction) {
  try {
    const { data } = yield call(AuthApi.signIn, payload);
    yield put(AuthActions.loginSuccess(data.data));
  } catch (e) {

    const error = e.errors && e.errors.length ? e.errors[0].Message : 'Email ou senha incorretos';
    //   toastHandler.showError(error); #revisar
    yield put(AuthActions.defaultFailure(error));
  }
}

export function* register({ payload }: RegisterAction) {
  try {
    const { data } = yield call(AuthApi.register, payload);
    yield put(AuthActions.registerSuccess(data.data));
  } catch (e) {

    const error = e.errors && e.errors.length ? e.errors[0].Message : 'Erro ao se cadastrar';
    //   toastHandler.showError(error); #revisar
    yield put(AuthActions.defaultFailure(error));
  }
}

export function* loginSuccess({ payload }: LoginSuccessAction) {
  AuthUtils.setLoggedUser({
    accessToken: payload.tokenResponse.access_token,
    refreshToken: payload.tokenResponse.refresh_token,
    expiresIn: payload.tokenResponse.expires_in,
  });

  // yield put(AuthActions.getUserInfo()); #revisar
  history.push('/obras');
}