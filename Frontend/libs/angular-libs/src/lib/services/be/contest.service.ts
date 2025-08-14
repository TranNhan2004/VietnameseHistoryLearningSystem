import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WEB_API_URL } from '../../tokens/tokens';
import { Contest, ContestResponse, IdsRequest } from '@frontend/models';

@Injectable({
  providedIn: 'root',
})
export class ContestService {
  constructor(
    private httpClient: HttpClient,
    @Inject(WEB_API_URL) private webApiUrl: string
  ) {}

  getAll() {
    return this.httpClient.get<ContestResponse[]>(`${this.webApiUrl}contests`);
  }

  getAllByIds(data: IdsRequest) {
    return this.httpClient.post<ContestResponse[]>(
      `${this.webApiUrl}contests/by-ids`,
      data
    );
  }

  getById(id: string) {
    return this.httpClient.get<ContestResponse>(
      `${this.webApiUrl}contests/${id}`
    );
  }

  create(data: Contest) {
    return this.httpClient.post<ContestResponse>(
      `${this.webApiUrl}contests`,
      data
    );
  }

  update(id: string, data: Contest) {
    return this.httpClient.put(`${this.webApiUrl}contests/${id}`, data);
  }

  delete(id: string) {
    return this.httpClient.delete(`${this.webApiUrl}contests/${id}`);
  }
}
