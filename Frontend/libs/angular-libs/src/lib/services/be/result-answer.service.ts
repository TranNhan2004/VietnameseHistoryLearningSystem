import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WEB_API_URL } from '../../tokens/tokens';
import { ResultAnswer, ResultAnswerResponse } from '@frontend/models';

@Injectable({
  providedIn: 'root',
})
export class ResultAnswerService {
  constructor(
    private httpClient: HttpClient,
    @Inject(WEB_API_URL) private webApiUrl: string
  ) {}

  createBatch(data: ResultAnswer[]) {
    return this.httpClient.post<ResultAnswerResponse[]>(
      `${this.webApiUrl}result-answers/batch`,
      data
    );
  }
}
