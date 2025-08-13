import { CreateTime, Id, UpdateTime } from './abstracts.model';

export interface Contest {
  name: string;
  description: string | null;
  durationInMinutes: number;
  startTime: Date | string;
  endTime: Date | string;
}

export interface ContestResponse extends Id, CreateTime, UpdateTime, Contest {
  contestQuestions: ContestQuestionResponse[];
}

export interface ContestQuestion {
  point: number;
  pointAllocationRule: string;
  contestId: string;
  questionId: string;
}

export interface ContestQuestionResponse extends Id, ContestQuestion {}

export interface CreateContestQuestions {
  contestId: string;
  questionIds: string[];
}
