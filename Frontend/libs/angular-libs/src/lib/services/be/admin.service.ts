import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WEB_API_URL } from '../../tokens/tokens';
import { UpdateAdminLevel } from '@frontend/models';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(
    private httpClient: HttpClient,
    @Inject(WEB_API_URL) private webApiUrl: string
  ) {}

  updateAdminLevel(id: string, data: UpdateAdminLevel) {
    return this.httpClient.put(`${this.webApiUrl}/admins/${id}`, data);
  }
}
