import { IUserResponse } from "../user/IUser";

export interface ILoginRequest {
    email: string;
    password: string;
}

export interface ILoginResponse {
    tokenResponse: ITokenResponse,
    user: IUserResponse
}

export interface ITokenResponse {
    access_token?: string;
    expires_in?: number;
    token_type?: string;
    refresh_token?: string;
    scope?: string;
}