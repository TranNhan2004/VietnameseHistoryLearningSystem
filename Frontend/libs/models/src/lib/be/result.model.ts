import { Id } from './abstracts.model';

export interface Result {
  startTime: Date | string;
  learnerId: string;
  contestId: string;
}

export interface ResultResponse extends Id, Result {
  endTime: Date | string;
  score: number;
}

export interface UpdateResult {
  endTime: Date | string;
}

export interface ResultAnswer {
  resultId: string;
  answerOptionId: string;
}

export interface ResultAnswerResponse extends Id, ResultAnswer {}
