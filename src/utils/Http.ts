import { useLocation } from 'react-router-dom';
import axios, { AxiosInstance } from 'axios';
import { ACCESS_TOKEN_KEY } from '../store/auth/Auth.constants';
import AppStorage from './AppStorage';
import { AuthUtils } from './AuthUtils';
// import { SERVER_ERROR } from './Messages';
// import { store } from '../Store';
// import { AuthActions } from '../Store/Auth/Auth.actions';

let faliedQueue: any[] = [];
let isRefreshing = false;

export class Http {
  static async axios(): Promise<AxiosInstance> {
    return new Promise((resolve) => {
      const authorization = AppStorage.GetItem(ACCESS_TOKEN_KEY);
      const headers = authorization ? { Authorization: `Bearer ${authorization}` } : null;
      const instance = axios.create({
        baseURL: process.env.REACT_APP_BASE_API_URL,
        headers,
      });
      instance.interceptors.response.use(undefined, Http.resolveErros);
      return resolve(instance);
    });
  }

  static resolveErros(err: any) {
    const res = err.response;
    switch (res.status) {
      case 401:
        return Http.refreshTokenInterceptor(err);
      case 500:
        const serverError = {
          success: false,
          errors: [{Message: "SERVER_ERROR"}],
        };
        throw serverError;
      default:
        throw err.response.data;
    }
  }

  static refreshTokenInterceptor(err: any) {
    const originalRequest = err.config;

    if (!originalRequest._retry) {
      if (isRefreshing) {
        return Http.addToFaliedQueue(originalRequest);
      }

      isRefreshing = true;
      originalRequest._retry = true;

      return Http.refreshToken(originalRequest);
    }
  }

  static refreshToken(originalRequest: any) {
    const user = AuthUtils.getLoggedUser();

    return new Promise(function(resolve, reject) {
      const instanceToRefresh = axios.create({
        baseURL: process.env.REACT_APP_BASE_API_URL,
      });

      instanceToRefresh.post('/account/refreshtoken', {
        RefreshToken: user.refreshToken,
      }).then(({ data }) => {
        const result = JSON.parse(data.data);
        AuthUtils.setLoggedUser({
          accessToken: result.access_token,
          refreshToken: result.refresh_token,
          expiresIn: result.expires_in,
        });
        // store.dispatch(AuthActions.getUserInfo());

        Http.processQueue(undefined, result.access_token);

        resolve(axios({
          ...originalRequest,
          headers: {
            ...originalRequest.headers,
            Authorization: `Bearer ${result.access_token}`,
          },
        }));
      }).catch((err: any) => {
        faliedQueue = [];
        Http.processQueue(err, undefined);
        reject(err);
        AuthUtils.logout();
        window.location.href = '/login';
      }).finally(() => {
        isRefreshing = false;
      });
    });
  }

  static processQueue(err: any, token?: string) {
    faliedQueue.forEach((promise) => {
      if (err) {
        promise.reject(err);
      } else {
        promise.resolve(token);
      }
    });
  }

  static addToFaliedQueue(originalRequest: any) {
    return new Promise(function(resolve, reject) {
      faliedQueue.push({resolve, reject});
    }).then((token: any) => {
      return axios({
        ...originalRequest,
        headers: {
          ...originalRequest.headers,
          Authorization: `Bearer ${token}`,
        },
      });
    }).catch((err: any) => Promise.reject(err));
  }

  static GetQueryParams(key: string) {
    return new URLSearchParams(useLocation().search).get(key);
  }

  static objectToQueryString(obj: object) {
    return Object
      .keys(obj)
      .reduce((query, prop) => `${query}&${prop}=${(obj as any)[prop]}`, '')
      .substr(1);
  }
}
