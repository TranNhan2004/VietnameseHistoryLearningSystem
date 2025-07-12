import { Injectable } from '@angular/core';
import { AESCrypto } from '@frontend/utils';

@Injectable({ providedIn: 'root' })
export class SharedService {
  put(key: string, value: string) {
    const encryptedKey = AESCrypto.encypt(key);
    const encryptedValue = AESCrypto.encypt(value);
    localStorage.setItem(encryptedKey, encryptedValue);
  }

  get(key: string): string {
    const encyptedKey = AESCrypto.encypt(key);
    const encryptedValue = localStorage.getItem(encyptedKey);
    return encryptedValue ? AESCrypto.decrypt(encryptedValue) : '';
  }

  has(key: string): boolean {
    const encyptedKey = AESCrypto.encypt(key);
    return localStorage.getItem(encyptedKey) !== null;
  }
}
