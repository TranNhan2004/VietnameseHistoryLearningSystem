import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WEB_API_URL } from '../../tokens/tokens';
import {
  LearnerLessonAnswer,
  LearnerLessonAnswerResponse,
} from '@frontend/models';

@Injectable({
  providedIn: 'root',
})
export class LearnerLessonAnswerService {
  constructor(
    private httpClient: HttpClient,
    @Inject(WEB_API_URL) private webApiUrl: string
  ) {}

  createBatch(data: LearnerLessonAnswer[]) {
    return this.httpClient.post<LearnerLessonAnswerResponse[]>(
      `${this.webApiUrl}learner-lesson-answers/batch`,
      data
    );
  }

  getByLearnerAndLesson(learnerId: string, lessonId: string) {
    return this.httpClient.get<LearnerLessonAnswerResponse[]>(
      `${this.webApiUrl}learner-lesson-answers?learnerId=${learnerId}&lessonId=${lessonId}`
    );
  }

  getByLearner(learnerId: string) {
    return this.httpClient.get<LearnerLessonAnswerResponse[]>(
      `${this.webApiUrl}learner-lesson-answers?learnerId=${learnerId}`
    );
  }
}
