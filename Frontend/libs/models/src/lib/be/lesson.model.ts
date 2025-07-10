import { CreateTime, Id, UpdateTime } from './abstracts.model';

export interface HistoricalPeriod {
  name: string;
  startYear: number;
  endYear: number;
}

export interface HistoricalPeriodResponse extends Id, HistoricalPeriod {}

export interface Lesson {
  title: string;
  videoUrl: string | null;
  description: string;
  adminId: string | null;
  historicalPeriodId: string;
}

export interface Paragraph {
  content: string;
  oridinalNumber: number;
  lessonId: string;
}

export interface ParagraphResponse extends Id, Paragraph {}

export interface Image {
  oridinalNumber: number;
  lessonId: string;
}

export interface ImageResponse extends Id, Image {
  imageUrl: string;
}

export interface LessonResponse extends Id, CreateTime, UpdateTime, Lesson {
  paragraphs: ParagraphResponse[];
  images: ImageResponse[];
}
