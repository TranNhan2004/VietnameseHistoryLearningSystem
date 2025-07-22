import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WEB_API_URL } from '../../tokens/tokens';
import { Question, QuestionResponse, UpdateQuestion } from '@frontend/models';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  constructor(
    private httpClient: HttpClient,
    @Inject(WEB_API_URL) private webApiUrl: string
  ) {}

  getAll() {
    return this.httpClient.get<QuestionResponse[]>(
      `${this.webApiUrl}questions`
    );
  }

  getById(id: string) {
    return this.httpClient.get<QuestionResponse>(
      `${this.webApiUrl}questions/${id}`
    );
  }

  create(data: Question) {
    return this.httpClient.post<QuestionResponse>(
      `${this.webApiUrl}questions`,
      data
    );
  }

  update(id: string, data: UpdateQuestion) {
    return this.httpClient.put(`${this.webApiUrl}questions/${id}`, data);
  }

  delete(id: string) {
    return this.httpClient.delete(`${this.webApiUrl}questions/${id}`);
  }
}
