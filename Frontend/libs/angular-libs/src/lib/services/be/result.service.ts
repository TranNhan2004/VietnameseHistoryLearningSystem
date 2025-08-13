import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WEB_API_URL } from '../../tokens/tokens';
import { Result, ResultResponse, UpdateResult } from '@frontend/models';

@Injectable({
  providedIn: 'root',
})
export class ResultService {
  constructor(
    private httpClient: HttpClient,
    @Inject(WEB_API_URL) private webApiUrl: string
  ) {}

  create(data: Result) {
    return this.httpClient.post<ResultResponse>(
      `${this.webApiUrl}results`,
      data
    );
  }

  getAllByLearner(learnerId: string) {
    return this.httpClient.get<ResultResponse[]>(
      `${this.webApiUrl}results?learnerId=${learnerId}`
    );
  }

  getById(id: string) {
    return this.httpClient.get<ResultResponse>(
      `${this.webApiUrl}results/${id}`
    );
  }

  update(id: string, data: UpdateResult) {
    return this.httpClient.put<ResultResponse>(
      `${this.webApiUrl}results/${id}`,
      data
    );
  }
}
