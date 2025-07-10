import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WEB_API_URL } from '../../tokens/tokens';
import { Paragraph, ParagraphResponse } from '@frontend/models';

@Injectable({
  providedIn: 'root',
})
export class ParagraphService {
  constructor(
    private httpClient: HttpClient,
    @Inject(WEB_API_URL) private webApiUrl: string
  ) {}

  create(data: Paragraph) {
    return this.httpClient.post<ParagraphResponse>(
      `${this.webApiUrl}paragraphs`,
      data
    );
  }

  update(id: string, data: Paragraph) {
    return this.httpClient.put(`${this.webApiUrl}paragraphs/${id}`, data);
  }

  delete(id: string) {
    return this.httpClient.delete(`${this.webApiUrl}paragraphs/${id}`);
  }
}
