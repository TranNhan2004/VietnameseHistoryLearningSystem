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

  upload(data: Image, imageFile: File) {
    const formData = new FormData();
    formData.append('imageJSON', JSON.stringify(data));
    formData.append('image', imageFile);
    return this.httpClient.post<ImageResponse>(`${this.webApiUrl}images`, data);
  }

  delete(id: string) {
    return this.httpClient.delete(`${this.webApiUrl}images/${id}`);
  }
}
