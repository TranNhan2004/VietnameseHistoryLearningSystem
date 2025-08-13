import { ContestQuestionResponse, ContestResponse } from '@frontend/models';

export const initialContestResponse: ContestResponse = {
  id: '',
  name: '',
  description: '',
  durationInMinutes: 0,
  contestQuestions: [],
  startTime: new Date(),
  endTime: new Date(),
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const initialContestQuestionResponse: ContestQuestionResponse = {
  id: '',
  point: 1,
  pointAllocationRule: '1:100',
  contestId: '',
  questionId: '',
};
