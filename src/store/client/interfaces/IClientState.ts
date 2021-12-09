import { IClientResponse } from '../../../data/interfaces/client/IClient';
import { IReducerStateBase } from '../../base/interface/IReducerStateBase';

export interface IClientState extends IReducerStateBase {
  clients: IClientResponse[];
}
