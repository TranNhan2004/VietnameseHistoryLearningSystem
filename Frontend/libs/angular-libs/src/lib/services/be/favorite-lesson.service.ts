import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WEB_API_URL } from '../../tokens/tokens';
import { FavoriteLesson, FavoriteLessonResponse } from '@frontend/models';

@Injectable({
  providedIn: 'root',
})
export class FavoriteLessonService {
  constructor(
    private httpClient: HttpClient,
    @Inject(WEB_API_URL) private webApiUrl: string
  ) {}

  getAllByLearner(learnerId: string) {
    return this.httpClient.get<FavoriteLessonResponse[]>(
      `${this.webApiUrl}favorite-lessons?learnerId=${learnerId}`
    );
  }

  create(data: FavoriteLesson) {
    return this.httpClient.post<FavoriteLessonResponse>(
      `${this.webApiUrl}favorite-lessons`,
      data
    );
  }

  delete(id: string) {
    return this.httpClient.delete(`${this.webApiUrl}favorite-lessons/${id}`);
  }
}
