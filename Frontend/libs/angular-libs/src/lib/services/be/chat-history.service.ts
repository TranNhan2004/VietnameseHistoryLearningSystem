import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WEB_API_URL } from '../../tokens/tokens';
import { ChatHistoryResponse, ChatQA, ChatQAResponse } from '@frontend/models';

@Injectable({
  providedIn: 'root',
})
export class ChatHistoryService {
  constructor(
    private httpClient: HttpClient,
    @Inject(WEB_API_URL) private webApiUrl: string
  ) {}

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
      `${this.webApiUrl}chat-histories?learnerId=${learnerId}&model=${model}`,
      formData
    );
  }

  getAllByLearner(learnerId: string) {
    return this.httpClient.get<ChatHistoryResponse[]>(
      `${this.webApiUrl}chat-histories?learnerId=${learnerId}`
    );
  }

  getById(id: string) {
    return this.httpClient.get<ChatHistoryResponse>(
      `${this.webApiUrl}chat-histories/${id}`
    );
  }

  delete(id: string) {
    return this.httpClient.delete(`${this.webApiUrl}chat-histories/${id}`);
  }
}
