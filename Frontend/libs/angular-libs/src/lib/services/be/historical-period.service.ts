import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WEB_API_URL } from '../../tokens/tokens';
import { HistoricalPeriod, HistoricalPeriodResponse } from '@frontend/models';

@Injectable({
  providedIn: 'root',
})
export class HistoricalPeriodService {
  constructor(
    private httpClient: HttpClient,
    @Inject(WEB_API_URL) private webApiUrl: string
  ) {}

  create(data: HistoricalPeriod) {
    return this.httpClient.post<HistoricalPeriodResponse>(
      `${this.webApiUrl}historical-periods`,
      data
    );
  }

  getAll() {
    return this.httpClient.get<HistoricalPeriodResponse[]>(
      `${this.webApiUrl}historical-periods`
    );
  }

  getById(id: string) {
    return this.httpClient.get<HistoricalPeriodResponse>(
      `${this.webApiUrl}historical-periods/${id}`
    );
  }

  update(id: string, data: HistoricalPeriod) {
    return this.httpClient.put(
      `${this.webApiUrl}historical-periods/${id}`,
      data
    );
  }

  delete(id: string) {
    return this.httpClient.delete(`${this.webApiUrl}historical-periods/${id}`);
  }
}
