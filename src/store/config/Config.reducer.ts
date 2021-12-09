import { ConfigActionKeys, ConfigActionUnion } from "./Config.actions";
import { IConfigState } from "./interfaces/IConfigState";

const initialState: IConfigState = {
    isLoading: false,
    insurance: []
};

const clientReducer = (state = initialState, action: ConfigActionUnion): IConfigState => {
    switch (action.type) {
        case ConfigActionKeys.INSURANCE_LIST_REQUEST:
            return { ...state, isLoading: true };
        case ConfigActionKeys.INSURANCE_LIST_SUCCESS:
            return {
                ...state,
                isLoading: false,
                insurance: action.payload
            };

        case ConfigActionKeys.DEFAULT_FAILED:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            };

        default:
            return state;
    }
}

export default clientReducer;