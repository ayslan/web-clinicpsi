import { AxiosResponse } from "axios";
import { Http } from "../utils/Http";
import { ILoginRequest, ILoginResponse } from "./interfaces/auth/ILogin";

export class AuthApi {
  static async signIn(body: ILoginRequest): Promise<AxiosResponse<ILoginResponse>> {
    const axios = await Http.axios();
    return axios.post('/auth/login', body);
  }
}