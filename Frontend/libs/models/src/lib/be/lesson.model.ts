import { Id } from './abstracts.model';

export interface HistoricalPeriod {
  name: string;
  startYear: number;
  endYear: number;
}

export interface HistoricalPeriodResponse extends Id, HistoricalPeriod {}

export interface Lesson {
  title: string;
  videoUrl: string | null;
}

export interface LessonResponse extends Id, Lesson {}
