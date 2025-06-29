import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  Admin,
  Avatar,
  Learner,
  UpdatePassword,
  UpdateUserInfo,
} from '@frontend/models';
import { WEB_API_URL } from '../tokens/tokens';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private httpClient: HttpClient,
    @Inject(WEB_API_URL) private webApiUrl: string
  ) {}

  getAdmin(id: string) {
    return this.httpClient.get<Admin>(`${this.webApiUrl}users/${id}`);
  }

  getLearner(id: string) {
    return this.httpClient.get<Learner>(`${this.webApiUrl}users/${id}`);
  }

  updateInfo(id: string, data: UpdateUserInfo) {
    return this.httpClient.put(`${this.webApiUrl}users/info/${id}`, data);
  }

  updatePassword(id: string, data: UpdatePassword) {
    return this.httpClient.put(`${this.webApiUrl}users/password/${id}`, data);
  }

  updateAvatar(id: string, file: File) {
    const formData = new FormData();
    formData.append('avatar', file);
    return this.httpClient.put<Avatar>(
      `${this.webApiUrl}users/avatar/${id}`,
      formData
    );
  }

  deleteAvatar(id: string) {
    return this.httpClient.delete(`${this.webApiUrl}users/avatar/${id}`);
  }
}
