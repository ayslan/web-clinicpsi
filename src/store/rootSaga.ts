import { all, takeLatest } from "redux-saga/effects";
import { AuthActionKeys } from "./auth/Auth.actions";
import { loginSuccess, register as registerUser, login } from "./auth/Auth.sagas";
import { ClientActionKeys } from "./client/Client.actions";
import { list as listClients, register as registerClient } from "./client/Client.sagas";

export function* rootSaga() {
    yield all([
        takeLatest(AuthActionKeys.LOGIN_REQUEST, login),
        takeLatest(AuthActionKeys.LOGIN_SUCCESS, loginSuccess),
        takeLatest(AuthActionKeys.REGISTER_REQUEST, registerUser),

        takeLatest(ClientActionKeys.CLIENT_LIST_REQUEST, listClients),
        takeLatest(ClientActionKeys.CLIENT_REGISTER_REQUEST, registerClient),
    ]);
}