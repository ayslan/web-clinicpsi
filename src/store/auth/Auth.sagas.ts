import { call, put } from 'redux-saga/effects';
import { history } from '../';
import { AuthApi } from '../../data/Auth.api';
import { AuthUtils } from '../../utils/AuthUtils';
import { AuthActions, UserLoginAction, UserLoginSuccessAction } from "./Auth.actions";

export function* signIn({ payload }: UserLoginAction) {
    try {
      const { data } = yield call(AuthApi.signIn, payload);
      const loginResponse = JSON.parse(data.data);
  
      yield put(AuthActions.userLoginSuccess(loginResponse));
    } catch (e) {
      
      const error = e.errors && e.errors.length ? e.errors[0].Message : 'Email ou senha incorretos';
      //   toastHandler.showError(error); #revisar
      yield put(AuthActions.userLoginFailure(error));
    }
  }

  
export function* loginSuccess({ payload }: UserLoginSuccessAction) {
    AuthUtils.setLoggedUser({
      accessToken: payload.access_token,
      refreshToken: payload.refresh_token,
      expiresIn: payload.expires_in,
    });
  
    // yield put(AuthActions.getUserInfo()); #revisar
    history.push('/obras');
  }