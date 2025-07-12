import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WEB_API_URL } from '../../tokens/tokens';
import { Lesson, LessonResponse, LessonVideoResponse } from '@frontend/models';

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

  create(data: Lesson) {
    return this.httpClient.post<LessonResponse>(
      `${this.webApiUrl}lessons`,
      data
    );
  }

  update(id: string, data: Lesson) {
    return this.httpClient.put(`${this.webApiUrl}lessons/${id}`, data);
  }

  delete(id: string) {
    return this.httpClient.delete(`${this.webApiUrl}lessons/${id}`);
  }

  uploadVideo(id: string, videoFile: File) {
    const formData = new FormData();
    formData.append('video', videoFile);
    return this.httpClient.put<LessonVideoResponse>(
      `${this.webApiUrl}lessons/video/${id}`,
      formData
    );
  }

  deleteVideo(id: string) {
    return this.httpClient.delete(`${this.webApiUrl}lessons/video/${id}`);
  }
}
