import { IClientState } from "./interfaces/IClientState";
import { ClientActionKeys, ClientActionUnion } from "./Client.actions";

const initialState: IClientState = {
    isLoading: false,
    clients: []
};

const clientReducer = (state = initialState, action: ClientActionUnion) => {
    switch (action.type) {
        case ClientActionKeys.LIST_REQUEST:
            return { ...state, isLoading: true };
        case ClientActionKeys.LIST_SUCCESS:
            return {
                ...state,
                isLoading: false,
                clients: action.payload
            };

        case ClientActionKeys.DEFAULT_FAILED:
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