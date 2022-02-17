import { AxiosResponse } from "axios";
import { Http } from "../utils/Http";
import { ILoginResponse } from "./interfaces/auth/ILogin";
import { IRegisterRequest } from "./interfaces/auth/IRegister";

export class AccountApi {
  static async register(body: IRegisterRequest): Promise<AxiosResponse<ILoginResponse>> {
    const axios = await Http.axios();
    return axios.post('/account/register', body);
  }
}