import { IReducerStateBase } from '../../base/interface/IReducerStateBase';
// import { IUserInforResponse } from '../../../Data/interfaces/Auth/IUserInfoResponse';

export interface IAuthState extends IReducerStateBase {
  accessToken?: string;
  isLogged: boolean;
  hasExpired: boolean;
  // userInfo?: IUserInforResponse;
}
