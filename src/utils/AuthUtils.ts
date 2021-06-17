import { ACCESS_TOKEN_KEY,
    REFRESH_TOKEN_KEY,
    EXPIRES_AT_KEY,
    ISSUED_DATETIME_KEY,
    EMAIL_KEY,
    NOME_KEY,
    USER_IMAGE_KEY,
    CURRENT_TENANT_KEY,
    USER_ID_KEY,
  } from '../store/auth/Auth.constants';
  import AppStorage from '../utils/AppStorage';
  
  export class AuthUtils {
    static getLoggedUser(): ILoggedUser {
      return {
        accessToken: AppStorage.GetItem(ACCESS_TOKEN_KEY) || undefined,
        refreshToken: AppStorage.GetItem(REFRESH_TOKEN_KEY) || undefined,
        expiresIn: Number(AppStorage.GetItem(EXPIRES_AT_KEY)) || undefined,
        issuedDatetime: AppStorage.GetItem(ISSUED_DATETIME_KEY) || undefined,
        email: AppStorage.GetItem(EMAIL_KEY) || undefined,
        nome: AppStorage.GetItem(NOME_KEY) || undefined,
        userImage: AppStorage.GetItem(USER_IMAGE_KEY) || undefined,
        currentTenant: Number(AppStorage.GetItem(CURRENT_TENANT_KEY)) || undefined,
        userId: AppStorage.GetItem(USER_ID_KEY) || undefined,
      };
    }
  
    static setLoggedUser(user: ILoggedUser) {
      AppStorage.SetItem(ACCESS_TOKEN_KEY, user.accessToken || '');
      AppStorage.SetItem(REFRESH_TOKEN_KEY, user.refreshToken || '');
      AppStorage.SetItem(EXPIRES_AT_KEY, user.expiresIn?.toString() || '');
      AppStorage.SetItem(ISSUED_DATETIME_KEY, new Date().toISOString());
      AppStorage.SetItem(EMAIL_KEY, user.email || '');
      AppStorage.SetItem(NOME_KEY, user.nome || '');
      AppStorage.SetItem(USER_IMAGE_KEY, user.userImage || '');
      AppStorage.SetItem(CURRENT_TENANT_KEY, user.currentTenant?.toString() || '');
      AppStorage.SetItem(USER_ID_KEY, user.userId?.toString() || '');
    }
  
    static logout() {
      AuthUtils.setLoggedUser({});
    }
  }
  
  export interface ILoggedUser {
    accessToken?: string;
    refreshToken?: string;
    issuedDatetime?: string;
    email?: string;
    nome?: string;
    userImage?: string;
    expiresIn?: number;
    currentTenant?: number;
    userId?: string;
  }
  