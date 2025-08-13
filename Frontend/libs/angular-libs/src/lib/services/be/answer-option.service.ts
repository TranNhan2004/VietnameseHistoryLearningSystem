import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WEB_API_URL } from '../../tokens/tokens';
import { AnswerOptionResponse, IdsRequest } from '@frontend/models';

@Injectable({
  providedIn: 'root',
})
export class AnswerOptionService {
  constructor(
    private httpClient: HttpClient,
    @Inject(WEB_API_URL) private webApiUrl: string
  ) {}

  getByIds(data: IdsRequest) {
    return this.httpClient.post<AnswerOptionResponse[]>(
      `${this.webApiUrl}answer-options/by-ids`,
      data
    );
  }

  delete(id: string) {
    return this.httpClient.delete(`${this.webApiUrl}answer-options/${id}`);
  }
}
