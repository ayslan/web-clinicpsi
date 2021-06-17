import { all, takeLatest } from "redux-saga/effects";
import { AuthActionKeys } from "./auth/Auth.actions";
import { loginSuccess, signIn } from "./auth/Auth.sagas";

export function* rootSaga() {
    yield all([
        takeLatest(AuthActionKeys.AUTH_LOGIN_REQUEST, signIn),
        takeLatest(AuthActionKeys.AUTH_LOGIN_SUCCESS, loginSuccess),
    ]);
}