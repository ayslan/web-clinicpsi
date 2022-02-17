import { ISystemState } from "./intefaces/ISystemState";
import { SystemActionKeys, SystemActionUnion } from "./System.actions";

const initialState: ISystemState = {
    isLoading: false,
    cities: [],
    countries: []
};

const systemReducer = (state = initialState, action: SystemActionUnion): ISystemState => {
    switch (action.type) {
        case SystemActionKeys.CITIES_LIST_REQUEST:
            return { ...state, isLoading: true };
        case SystemActionKeys.CITIES_LIST_SUCCESS:
            return {
                ...state,
                isLoading: false,
                cities: action.payload
            };

        case SystemActionKeys.COUNTRIES_LIST_REQUEST:
            return { ...state, isLoading: true };
        case SystemActionKeys.COUNTRIES_LIST_SUCCESS:
            return {
                ...state,
                isLoading: false,
                countries: action.payload
            };

        case SystemActionKeys.DEFAULT_FAILED:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            };

        default:
            return state;
    }
}

export default systemReducer;