import { CreateTime, Id } from './abstracts.model';

export interface ChatQA {
  question: string;
  answer: string;
  chatHistoryId: string;
}

export interface ChatQAResponse extends Id, CreateTime, ChatQA {}

export interface ChatHistory {
  title: string;
  learnerId: string;
}

export interface ChatHistoryResponse extends Id, CreateTime, ChatHistory {
  chatQAs: ChatQAResponse[];
}

export interface ChatBotConfig {
  icrTopK: number;
  ocrTopK: number;
  maxPdfWords: number;
  fcAlpha: number;
  fcTopK: number;
  fcMinThreshold: number;
  agMaxTokens: number;
  agTemperature: number;
  agTopP: number;
  agRepeatPenalty: number;
}

export type ChatBotConfigResponse = ChatBotConfig;
