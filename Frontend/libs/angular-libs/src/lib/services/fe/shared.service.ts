import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SharedService {
  private store: { [key: string]: string } = {};

  private storeSubject = new BehaviorSubject<{ [key: string]: string }>({});
  store$ = this.storeSubject.asObservable();

  put(key: string, value: string) {
    this.store[key] = value;
    this.storeSubject.next({ ...this.store });
  }

  get(key: string): string | undefined {
    return this.store[key];
  }

  getStore(): { [key: string]: string } {
    return { ...this.store };
  }
}
