import { Id } from './abstracts.model';

export interface Question {
  content: string;
  lessonId: string | null;
  answerOptions: AnswerOption[];
}

export interface QuestionResponse extends Id, Omit<Question, 'answerOptions'> {
  answerOptions: AnswerOptionResponse[];
}

export interface AnswerOption {
  content: string;
  correct: boolean;
}

export interface AnswerOptionResponse extends Id, AnswerOption {}

export interface UpdateAnswerOption extends AnswerOption {
  id: string | null;
}

export interface UpdateQuestion extends Omit<Question, 'answerOptions'> {
  answerOptions: UpdateAnswerOption[];
}
