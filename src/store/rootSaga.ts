import { all, takeLatest } from "redux-saga/effects";
import { AuthActionKeys } from "./auth/Auth.actions";
import { loginSuccess, register, signIn } from "./auth/Auth.sagas";

export function* rootSaga() {
    yield all([
        takeLatest(AuthActionKeys.LOGIN_REQUEST, signIn),
        takeLatest(AuthActionKeys.LOGIN_SUCCESS, loginSuccess),
        takeLatest(AuthActionKeys.REGISTER_REQUEST, register)
    ]);
}