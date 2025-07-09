import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class MyMetadataService {
  constructor(private title: Title, private meta: Meta) {}

  set(metadata: { title?: string; description?: string; keywords?: string }) {
    if (metadata.title) {
      this.title.setTitle(metadata.title);
    }
    if (metadata.description) {
      this.meta.updateTag({
        name: 'description',
        content: metadata.description,
      });
    }
    if (metadata.keywords) {
      this.meta.updateTag({
        name: 'keywords',
        content: metadata.keywords,
      });
    }
  }
}
