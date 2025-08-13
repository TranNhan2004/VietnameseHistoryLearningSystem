import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WEB_API_URL } from '../../tokens/tokens';
import {
  IdsRequest,
  Question,
  QuestionResponse,
  UpdateQuestion,
  UpdateQuestionForLesson,
} from '@frontend/models';

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

  getByIds(data: IdsRequest) {
    return this.httpClient.post<QuestionResponse[]>(
      `${this.webApiUrl}questions/get-by-ids`,
      data
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

  updateForLesson(data: UpdateQuestionForLesson) {
    return this.httpClient.put(`${this.webApiUrl}questions/for-lesson`, data);
  }

  delete(id: string) {
    return this.httpClient.delete(`${this.webApiUrl}questions/${id}`);
  }
}
