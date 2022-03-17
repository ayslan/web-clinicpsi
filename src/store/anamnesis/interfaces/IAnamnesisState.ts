import { IAnamnesis } from '../../../data/interfaces/anamnesis/IAnamnesis';
import { IReducerStateBase } from '../../base/interface/IReducerStateBase';

export interface IAnamnesisState extends IReducerStateBase {
  anamnesis?: IAnamnesis[];
  isLoadingAnamnesis: boolean;
}
