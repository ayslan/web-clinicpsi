import { call, put } from 'redux-saga/effects';
import { history } from '../';
import { AuthApi } from '../../data/Auth.api';
import { AuthUtils } from '../../utils/AuthUtils';
import { userLogin, defaultFailure, userLoginSuccess } from './Auth.actions';

export function* signIn({ payload }: ReturnType<typeof userLogin>) {
  try {
    const { data } = yield call(AuthApi.signIn, payload.data);
    const loginResponse = JSON.parse(data.data);

    yield put(userLoginSuccess(loginResponse));
  } catch (e) {

    const error = e.errors && e.errors.length ? e.errors[0].Message : 'Email ou senha incorretos';
    //   toastHandler.showError(error); #revisar
    yield put(defaultFailure(error));
  }
}

export function* loginSuccess({ payload }: ReturnType<typeof userLoginSuccess>) {
  AuthUtils.setLoggedUser({
    accessToken: payload.data.access_token,
    refreshToken: payload.data.refresh_token,
    expiresIn: payload.data.expires_in,
  });

  // yield put(AuthActions.getUserInfo()); #revisar
  history.push('/obras');
}