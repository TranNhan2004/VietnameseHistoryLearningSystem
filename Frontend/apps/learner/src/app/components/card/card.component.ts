import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card',
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent {
  @Input() width = '300px';
  @Input() height = '200px';
  @Input() customClasses = '';
  @Input() useFooter = true;
}
