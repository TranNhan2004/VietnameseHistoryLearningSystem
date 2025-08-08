import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WEB_API_URL } from '../../tokens/tokens';
import {
  ChatBotConfig,
  ChatHistoryResponse,
  ChatQA,
  ChatQAResponse,
} from '@frontend/models';

@Injectable({
  providedIn: 'root',
})
export class ChatBotService {
  constructor(
    private httpClient: HttpClient,
    @Inject(WEB_API_URL) private webApiUrl: string
  ) {}

  setConfig(data: ChatBotConfig) {
    return this.httpClient.put(`${this.webApiUrl}chatbot/config`, data);
  }

  getConfig() {
    return this.httpClient.get<ChatBotConfig>(
      `${this.webApiUrl}chatbot/config`
    );
  }

  createOrUpdate(
    learnerId: string,
    model: string,
    data: ChatQA,
    pdf: File | null
  ) {
    const formData = new FormData();
    formData.append('metadata', JSON.stringify(data));

    if (pdf !== null) {
      formData.append('pdf', pdf);
    }

    return this.httpClient.post<ChatQAResponse>(
      `${this.webApiUrl}chatbot/histories?learnerId=${learnerId}&model=${model}`,
      formData
    );
  }

  getAllByLearner(learnerId: string) {
    return this.httpClient.get<ChatHistoryResponse[]>(
      `${this.webApiUrl}chatbot/histories?learnerId=${learnerId}`
    );
  }

  getById(id: string) {
    return this.httpClient.get<ChatHistoryResponse>(
      `${this.webApiUrl}chatbot/histories/${id}`
    );
  }

  delete(id: string) {
    return this.httpClient.delete(`${this.webApiUrl}chatbot/histories/${id}`);
  }
}
