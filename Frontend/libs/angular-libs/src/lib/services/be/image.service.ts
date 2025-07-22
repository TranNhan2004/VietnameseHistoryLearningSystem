import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WEB_API_URL } from '../../tokens/tokens';
import { Image, ImageResponse } from '@frontend/models';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  constructor(
    private httpClient: HttpClient,
    @Inject(WEB_API_URL) private webApiUrl: string
  ) {}

  create(data: Image) {
    return this.httpClient.post<ImageResponse>(`${this.webApiUrl}images`, data);
  }

  update(id: string, data: Image) {
    return this.httpClient.put(`${this.webApiUrl}images/${id}`, data);
  }

  delete(id: string) {
    return this.httpClient.delete(`${this.webApiUrl}images/${id}`);
  }

  uploadFile(id: string, imageFile: File) {
    const formData = new FormData();
    formData.append('image', imageFile);
    return this.httpClient.put<ImageResponse>(
      `${this.webApiUrl}images/file/${id}`,
      formData
    );
  }

  deleteFile(id: string) {
    return this.httpClient.delete(`${this.webApiUrl}images/file/${id}`);
  }
}
