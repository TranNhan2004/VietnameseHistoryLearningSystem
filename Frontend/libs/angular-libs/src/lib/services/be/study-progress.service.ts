import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WEB_API_URL } from '../../tokens/tokens';
import { StudyProgress, StudyProgressResponse } from '@frontend/models';

@Injectable({
  providedIn: 'root',
})
export class StudyProgressService {
  constructor(
    private httpClient: HttpClient,
    @Inject(WEB_API_URL) private webApiUrl: string
  ) {}

  getAllByLearner(learnerId: string) {
    return this.httpClient.get<StudyProgressResponse[]>(
      `${this.webApiUrl}study-progresses?learnerId=${learnerId}`
    );
  }

  create(data: StudyProgress) {
    return this.httpClient.post<StudyProgressResponse>(
      `${this.webApiUrl}study-progresses`,
      data
    );
  }

  update(id: string, data: StudyProgress) {
    return this.httpClient.put(`${this.webApiUrl}study-progresses\{$id}`, data);
  }

  delete(id: string) {
    return this.httpClient.delete(`${this.webApiUrl}study-progresses/${id}`);
  }
}
