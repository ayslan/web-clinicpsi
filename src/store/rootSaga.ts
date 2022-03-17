import { all, takeLatest } from "redux-saga/effects";
import { AnamnesisActionKeys } from "./anamnesis/Anamnesis.actions";
import { AuthActionKeys } from "./auth/Auth.actions";
import { loginSuccess, register as registerUser, login } from "./auth/Auth.sagas";
import { ClientActionKeys } from "./client/Client.actions";
import { list as listClients, register as registerClient, update as updateClient } from "./client/Client.sagas";
import { ConfigActionKeys } from "./config/Config.actions";
import { listInsurance } from "./config/Config.sagas";
import { SystemActionKeys } from "./system/System.actions";
import { listCities, listCoutries } from './system/System.sagas';
import { list as listAnamnesis } from './anamnesis/Anamnesis.sagas';

export function* rootSaga() {
    yield all([
        takeLatest(AuthActionKeys.LOGIN_REQUEST, login),
        takeLatest(AuthActionKeys.LOGIN_SUCCESS, loginSuccess),
        takeLatest(AuthActionKeys.REGISTER_REQUEST, registerUser),

        takeLatest(ClientActionKeys.CLIENT_LIST_REQUEST, listClients),
        takeLatest(ClientActionKeys.CLIENT_REGISTER_REQUEST, registerClient),
        takeLatest(ClientActionKeys.CLIENT_UPDATE_REQUEST, updateClient),

        takeLatest(SystemActionKeys.CITIES_LIST_REQUEST, listCities),
        takeLatest(SystemActionKeys.COUNTRIES_LIST_REQUEST, listCoutries),

        takeLatest(ConfigActionKeys.INSURANCE_LIST_REQUEST, listInsurance),

        takeLatest(AnamnesisActionKeys.ANAMNESIS_LIST_REQUEST, listAnamnesis),
    ]);
}