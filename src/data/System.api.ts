import { AxiosResponse } from "axios";
import { Http } from "../utils/Http";
import { ICity } from "./interfaces/system/ICity";
import { ICountry } from "./interfaces/system/ICountry";

export class SystemApi {
    static async listCities(): Promise<AxiosResponse<ICity[]>> {
        const axios = await Http.axios();
        return axios.get('system/cities');
    }

    static async listCoutries(): Promise<AxiosResponse<ICountry[]>> {
        const axios = await Http.axios();
        return axios.get('system/coutries');
    }
}