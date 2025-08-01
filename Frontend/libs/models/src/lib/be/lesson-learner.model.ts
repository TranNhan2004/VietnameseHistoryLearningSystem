import { Id } from './abstracts.model';

export interface FavoriteLesson {
  lessonId: string;
  learnerId: string;
}

export interface FavoriteLessonResponse extends Id, FavoriteLesson {}

export interface StudyProgress {
  progress: number;
  lessonId: string;
  learnerId: string;
}

export interface StudyProgressResponse extends Id, StudyProgress {}

export interface LearnerLessonAnswer {
  learnerId: string;
  lessonId: string;
  answerOptionId: string;
}

export interface LearnerLessonAnswerResponse extends Id, LearnerLessonAnswer {}
