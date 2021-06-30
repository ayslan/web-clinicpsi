import { AxiosResponse } from "axios";
import { Http } from "../utils/Http";
import { ILoginRequest } from "./interfaces/auth/ILoginRequest";
import { ILoginResponse } from "./interfaces/auth/ILoginResponse";

export class AuthApi {
  static async signIn(body: ILoginRequest): Promise<AxiosResponse<ILoginResponse>> {
    const axios = await Http.axios();
    return axios.post('/Account/Login', body);
  }
}