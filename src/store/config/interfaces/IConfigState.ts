import { IInsurance } from '../../../data/interfaces/config/IInsurance';
import { IReducerStateBase } from '../../base/interface/IReducerStateBase';

export interface IConfigState extends IReducerStateBase {
  insurance: IInsurance[];
}
