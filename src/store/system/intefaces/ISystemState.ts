import { ICity } from "../../../data/interfaces/system/ICity";
import { ICountry } from "../../../data/interfaces/system/ICountry";
import { IReducerStateBase } from "../../base/interface/IReducerStateBase";

export interface ISystemState extends IReducerStateBase {
    cities: ICity[];
    coutries: ICountry[];
}
