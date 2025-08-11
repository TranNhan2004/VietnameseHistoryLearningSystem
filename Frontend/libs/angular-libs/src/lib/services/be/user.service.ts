import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  AdminResponse,
  AvatarResponse,
  LearnerResponse,
  ResetPassword,
  RoleType,
  UpdatePassword,
  UpdateUserInfo,
} from '@frontend/models';
import { WEB_API_URL } from '../../tokens/tokens';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private httpClient: HttpClient,
    @Inject(WEB_API_URL) private webApiUrl: string
  ) {}

  getAll() {
    return this.httpClient.get<(AdminResponse | LearnerResponse)[]>(
      `${this.webApiUrl}users`
    );
  }

  getByRole(role: RoleType) {
    return this.httpClient.get<(AdminResponse | LearnerResponse)[]>(
      `${this.webApiUrl}users?role=${role}`
    );
  }

  lock(id: string) {
    return this.httpClient.put(`${this.webApiUrl}users/lock/${id}`, {});
  }

  unlock(id: string) {
    return this.httpClient.put(`${this.webApiUrl}users/unlock/${id}`, {});
  }

  getAdmin(id: string) {
    return this.httpClient.get<AdminResponse>(`${this.webApiUrl}users/${id}`);
  }

  getLearner(id: string) {
    return this.httpClient.get<LearnerResponse>(`${this.webApiUrl}users/${id}`);
  }

  updateInfo(id: string, data: UpdateUserInfo) {
    return this.httpClient.put(`${this.webApiUrl}users/info/${id}`, data);
  }

  updatePassword(id: string, data: UpdatePassword) {
    return this.httpClient.put(`${this.webApiUrl}users/password/${id}`, data);
  }

  uploadAvatar(id: string, file: File) {
    const formData = new FormData();
    formData.append('avatar', file);
    return this.httpClient.put<AvatarResponse>(
      `${this.webApiUrl}users/avatar/${id}`,
      formData
    );
  }

  deleteAvatar(id: string) {
    return this.httpClient.delete(`${this.webApiUrl}users/avatar/${id}`);
  }

  resetPassword(data: ResetPassword) {
    return this.httpClient.put(`${this.webApiUrl}users/reset-password`, data);
  }
}
