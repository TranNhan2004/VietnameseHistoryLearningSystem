import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WEB_API_URL } from '../../tokens/tokens';
import { LessonResponse } from '@frontend/models';

@Injectable({
  providedIn: 'root',
})
export class LessonService {
  constructor(
    private httpClient: HttpClient,
    @Inject(WEB_API_URL) private webApiUrl: string
  ) {}

  getAllByHistoricalPeriodId(historicalPeriodId: string) {
    return this.httpClient.get<LessonResponse[]>(
      `${this.webApiUrl}lessons?historicalPeriodId=${historicalPeriodId}`
    );
  }

  getById(id: string) {
    return this.httpClient.get<LessonResponse>(
      `${this.webApiUrl}lessons/${id}`
    );
  }

  delete(id: string) {
    return this.httpClient.delete(`${this.webApiUrl}lessons/${id}`);
  }
}
