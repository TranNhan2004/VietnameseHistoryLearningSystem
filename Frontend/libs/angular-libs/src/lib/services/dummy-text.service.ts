import { Injectable } from '@angular/core';
import { LoremIpsum } from 'lorem-ipsum';

@Injectable({
  providedIn: 'root',
})
export class DummyTextService {
  private lorem = new LoremIpsum();

  generate(paragraphs = 1) {
    return this.lorem.generateParagraphs(paragraphs);
  }
}
