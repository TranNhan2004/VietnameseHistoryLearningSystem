import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class PermissionService {
  private access = true;

  get canAccess() {
    return this.access;
  }

  reset() {
    this.access = true;
  }

  deny() {
    this.access = false;
  }
}
