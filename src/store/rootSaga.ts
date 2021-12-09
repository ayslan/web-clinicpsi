import { all, takeLatest } from "redux-saga/effects";
import { AuthActionKeys } from "./auth/Auth.actions";
import { loginSuccess, register, login } from "./auth/Auth.sagas";
import { ClientActionKeys } from "./client/Client.actions";
import { list } from "./client/Client.sagas";

export function* rootSaga() {
    yield all([
        takeLatest(AuthActionKeys.LOGIN_REQUEST, login),
        takeLatest(AuthActionKeys.LOGIN_SUCCESS, loginSuccess),
        takeLatest(AuthActionKeys.REGISTER_REQUEST, register),

        takeLatest(ClientActionKeys.LIST_REQUEST, list),
    ]);
}