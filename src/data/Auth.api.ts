import { AxiosResponse } from "axios";
import { Http } from "../utils/Http";
import { ILoginRequest } from "./interfaces/ILoginRequest";
import { ILoginResponse } from "./interfaces/ILoginResponse";

export class AuthApi {
  static async signIn(body: ILoginRequest): Promise<AxiosResponse<ILoginResponse>> {
    const axios = await Http.axios();
    return axios.post('/Account/Login', body);
  }
}