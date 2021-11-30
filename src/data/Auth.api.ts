import { AxiosResponse } from "axios";
import { Http } from "../utils/Http";
import { ILoginRequest, ILoginResponse } from "./interfaces/auth/ILogin";
import { IRegisterRequest } from "./interfaces/auth/IRegister";

export class AuthApi {
  static async signIn(body: ILoginRequest): Promise<AxiosResponse<ILoginResponse>> {
    const axios = await Http.axios();
    return axios.post('/account/login', body);
  }

  static async register(body: IRegisterRequest): Promise<AxiosResponse<ILoginResponse>> {
    const axios = await Http.axios();
    return axios.post('/account/register', body);
  }
}