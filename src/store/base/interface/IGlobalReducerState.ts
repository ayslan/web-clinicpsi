import { IAnamnesisState } from "../../anamnesis/interfaces/IAnamnesisState";
import { IAuthState } from "../../auth/interfaces/IAuthState";
import { IClientState } from "../../client/interfaces/IClientState";
import { IConfigState } from "../../config/interfaces/IConfigState";
import { ISystemState } from "../../system/intefaces/ISystemState";

export interface IGlobalReducerState {
  auth: IAuthState;
  client: IClientState;
  config: IConfigState;
  system: ISystemState;
  anamnesis: IAnamnesisState;
}
