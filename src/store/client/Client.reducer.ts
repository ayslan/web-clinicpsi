import { IClientState } from "./interfaces/IClientState";
import { ClientActionKeys, ClientActionUnion } from "./Client.actions";

const initialState: IClientState = {
    isLoading: false,
    clients: []
};

const clientReducer = (state = initialState, action: ClientActionUnion): IClientState => {
    switch (action.type) {
        case ClientActionKeys.CLIENT_LIST_REQUEST:
            return { ...state, isLoading: true };
        case ClientActionKeys.CLIENT_LIST_SUCCESS:
            return {
                ...state,
                isLoading: false,
                clients: action.payload
            };

        case ClientActionKeys.CLIENT_REGISTER_REQUEST:
            return { ...state, isLoading: true };
        case ClientActionKeys.CLIENT_REGISTER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                clients: [...state.clients, action.payload]
            };

        case ClientActionKeys.CLIENT_UPDATE_REQUEST:
            return { ...state, isLoading: true };
        case ClientActionKeys.CLIENT_UPDATE_SUCCESS:

            var registros = [...state.clients];
            var index = registros.findIndex(x => x.clientId == action.payload.clientId);
            registros.splice(index, 1, action.payload);

            return {
                ...state,
                isLoading: false,
                clients: registros
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