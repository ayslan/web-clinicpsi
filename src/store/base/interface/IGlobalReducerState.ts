import { IAuthState } from "../../auth/interfaces/IAuthState";
import { IClientState } from "../../client/interfaces/IClientState";

export interface IGlobalReducerState {
  auth: IAuthState;
  client: IClientState;
}
