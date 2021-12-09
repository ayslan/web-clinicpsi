import { AxiosResponse } from "axios";
import { Http } from "../utils/Http";
import { IInsurance } from "./interfaces/config/IInsurance";

export class ConfigApi {
    static async listInsurance(): Promise<AxiosResponse<IInsurance[]>> {
        const axios = await Http.axios();
        return axios.get('/config/insurace');
    }
}