import { IAuthState } from "./interfaces/IAuthState";
import AppStorage from "../../utils/AppStorage"
import { add } from "date-fns";
import { ACCESS_TOKEN_KEY, EXPIRES_AT_KEY, ISSUED_DATETIME_KEY, REFRESH_TOKEN_KEY } from "./Auth.constants";
import { AuthActionKeys } from "./Auth.actions";
import { Reducer } from "redux";

const token = AppStorage.GetItem(ACCESS_TOKEN_KEY);
const refreshToken = AppStorage.GetItem(REFRESH_TOKEN_KEY);
const expiresAt = AppStorage.GetItem(EXPIRES_AT_KEY);
const issuedDatetime = AppStorage.GetItem(ISSUED_DATETIME_KEY);

const isTokenExpired = () => {
    return (!issuedDatetime || !expiresAt
        || add(new Date(issuedDatetime), { seconds: parseInt(expiresAt, 10) }) < new Date());
};

const initialState: IAuthState = {
    accessToken: token || undefined,
    isLogged: !isTokenExpired() || !!refreshToken,
    isLoading: false,
    hasExpired: isTokenExpired(),
};

const authReducer: Reducer<IAuthState> = (state = initialState, action) => {
    switch (action.type) {
        case AuthActionKeys.AUTH_LOGIN_REQUEST:
            return { ...state, isLoading: true };
        case AuthActionKeys.AUTH_LOGIN_SUCCESS:
            return {
                ...state,
                isLogged: true,
                isLoading: false,
                accessToken: action.payload.access_token,
                message: undefined,
                error: undefined,
            };
        case AuthActionKeys.DEFAULT_FAILED:
            return {
                ...state,
                isLoading: false,
                accessToken: undefined,
                isLogged: false,
                error: action.payload,
                message: undefined,
            };
        default:
            return state;
    }
}

export default authReducer;