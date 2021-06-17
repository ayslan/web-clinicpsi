class AppStorage {
    REMEMBER_ME_KEY = 'REMEMBER_ME';
    SetItem(key: string, value: string) {
      const storage = this.GetStorage();
      storage.setItem(key, value);
    }
    GetItem(key: string): string | null {
      const storage = this.GetStorage();
      return storage.getItem(key);
    }
    RemoveItem(key: string) {
      const storage = this.GetStorage();
      storage.removeItem(key);
    }
    SetRememberMe(rememberMe: boolean) {
      localStorage.setItem(this.REMEMBER_ME_KEY, rememberMe.toString());
    }
    private GetStorage(): Storage {
      const rememberMe = this.GetRememberMe();
      return rememberMe ? localStorage : sessionStorage;
    }
    private GetRememberMe(): boolean {
      const rememberMe = localStorage.getItem(this.REMEMBER_ME_KEY);
      return rememberMe === 'true';
    }
  }
  const instance = new AppStorage();
  export default instance;
  