import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WEB_API_URL } from '../../tokens/tokens';
import { ContestQuestion, CreateContestQuestions } from '@frontend/models';

@Injectable({
  providedIn: 'root',
})
export class ContestQuestionService {
  constructor(
    private httpClient: HttpClient,
    @Inject(WEB_API_URL) private webApiUrl: string
  ) {}

  createBatch(data: CreateContestQuestions) {
    return this.httpClient.post<ContestQuestion[]>(
      `${this.webApiUrl}contest-questions/batch`,
      data
    );
  }

  update(id: string, data: ContestQuestion) {
    return this.httpClient.put(
      `${this.webApiUrl}contest-questions/${id}`,
      data
    );
  }

  delete(id: string) {
    return this.httpClient.delete(`${this.webApiUrl}contest-questions/${id}`);
  }
}
