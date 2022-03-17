import { AnamnesisActionKeys, AnamnesisActionUnion } from "./Anamnesis.actions";
import { IAnamnesisState } from "./interfaces/IAnamnesisState";

const initialState: IAnamnesisState = {
    isLoading: false,
    isLoadingAnamnesis: false,
};

const anamnesisReducer = (state = initialState, action: AnamnesisActionUnion): IAnamnesisState => {
    switch (action.type) {
        case AnamnesisActionKeys.ANAMNESIS_LIST_REQUEST:
            return {
                ...state,
                anamnesis: undefined,
                isLoading: true,
                isLoadingAnamnesis: true
            };
        case AnamnesisActionKeys.ANAMNESIS_LIST_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isLoadingAnamnesis: false,
                anamnesis: action.payload
            };

        // case ClientActionKeys.CLIENT_REGISTER_REQUEST:
        //     return { ...state, isLoading: true };
        // case ClientActionKeys.CLIENT_REGISTER_SUCCESS:
        //     return {
        //         ...state,
        //         isLoading: false,
        //         clients: [...state.clients, action.payload]
        //     };

        // case ClientActionKeys.CLIENT_UPDATE_REQUEST:
        //     return { ...state, isLoading: true };
        // case ClientActionKeys.CLIENT_UPDATE_SUCCESS:

        //     var registros = [...state.clients];
        //     var index = registros.findIndex(x => x.clientId == action.payload.clientId);
        //     registros.splice(index, 1, action.payload);

        //     return {
        //         ...state,
        //         isLoading: false,
        //         clients: registros
        //     };

        case AnamnesisActionKeys.DEFAULT_FAILED:
            return {
                ...state,
                isLoading: false,
                isLoadingAnamnesis: false,
                error: action.payload,
            };

        default:
            return state;
    }
}

export default anamnesisReducer;