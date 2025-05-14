import { AESCrypto } from './aes';

export class CookieHelpers {
  static set(name: string, data: string, maxAge: number) {
    const ciphertext = AESCrypto.encypt(data);
    document.cookie = `${name}=${ciphertext}; path=/; secure=true; samesite=none; max-age=${maxAge.toString()}`;
  }

  static get(name: string) {
    const value = document.cookie
      .split('; ')
      .find((row) => row.startsWith(`${name}=`))
      ?.split('=')[1];
    return value ? AESCrypto.decrypt(value) : null;
  }

  static delete(name: string) {
    document.cookie = `${name}=; path=/; secure=true; samesite=none; max-age=0`;
  }
}
