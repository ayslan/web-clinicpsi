import { AxiosResponse } from "axios";
import { Http } from "../utils/Http";
import { IClientResponse } from "./interfaces/client/IClient";

export class ClientApi {
  static async list(): Promise<AxiosResponse<IClientResponse[]>> {
    const axios = await Http.axios();
    return axios.get('/clients');
  }

  static async register(body: IClientResponse): Promise<AxiosResponse<IClientResponse>> {
    const axios = await Http.axios();
    return axios.post('/clients', body);
  }
}