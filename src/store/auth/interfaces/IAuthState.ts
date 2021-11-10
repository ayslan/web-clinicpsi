import { IUserResponse } from '../../../data/interfaces/user/IUser';
import { IReducerStateBase } from '../../base/interface/IReducerStateBase';

export interface IAuthState extends IReducerStateBase {
  accessToken?: string;
  isLogged: boolean;
  hasExpired: boolean;
  user?: IUserResponse;
}
