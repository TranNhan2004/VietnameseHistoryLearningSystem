import {
  HistoricalPeriodResponse,
  ImageResponse,
  LessonResponse,
  ParagraphResponse,
} from '@frontend/models';

export const initialHistoricalPeriodResponse: HistoricalPeriodResponse = {
  id: '',
  name: '',
  startYear: 0,
  endYear: 0,
};

export const initialLessonResponse: LessonResponse = {
  id: '',
  title: '',
  description: '',
  adminId: '',
  historicalPeriodId: '',
  videoUrl: '',
  paragraphs: [],
  images: [],
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const initialParagraphResponse: ParagraphResponse = {
  id: '',
  content: '',
  ordinalNumber: 1,
  lessonId: '',
};

export const initialImageReponse: ImageResponse = {
  id: '',
  title: '',
  imageUrl: '',
  ordinalNumber: 1,
  lessonId: '',
};
