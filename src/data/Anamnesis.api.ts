import { AxiosResponse } from "axios";
import { Http } from "../utils/Http";
import { IAnamnesis } from "./interfaces/anamnesis/IAnamnesis";

export class AnamnesisApi {
    static async list(): Promise<AxiosResponse<IAnamnesis[]>> {
        const axios = await Http.axios();
        return axios.get('/anamnesis');
    }
}