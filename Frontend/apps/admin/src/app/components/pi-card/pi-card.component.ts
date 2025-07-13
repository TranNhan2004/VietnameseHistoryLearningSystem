import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActionButtonComponent } from '@frontend/angular-libs';
import { ActionButtonName } from '@frontend/models';

@Component({
  selector: 'app-pi-card',
  imports: [CommonModule, ActionButtonComponent],
  templateUrl: './pi-card.component.html',
  styleUrl: './pi-card.component.css',
})
export class PiCardComponent {
  @Input({ required: true }) id!: string;
  @Input({ required: true }) ordinalNumber!: number;

  @Output() editFn = new EventEmitter<string>();
  @Output() deleteFn = new EventEmitter<string>();

  protected readonly ActionButtonName = ActionButtonName;
}
