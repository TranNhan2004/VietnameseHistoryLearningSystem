import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Admin, Learner } from '@frontend/models';
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
}
