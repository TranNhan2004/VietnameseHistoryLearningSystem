import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActionButtonComponent } from '@frontend/angular-libs';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MyFormGroupHelper } from '@frontend/utils';
import { paragraphMessages } from '@frontend/constants';
import { ActionButtonName } from '@frontend/models';

@Component({
  selector: 'app-paragraph-form',
  imports: [CommonModule, ActionButtonComponent, ReactiveFormsModule],
  templateUrl: './paragraph-form.component.html',
  styleUrl: './paragraph-form.component.css',
})
export class ParagraphFormComponent {
  @Input({ required: true }) formGroup!: FormGroup;
  @Input() formHelper!: MyFormGroupHelper;

  @Output() saveFn = new EventEmitter<void>();
  @Output() cancelFn = new EventEmitter<void>();
  protected readonly paragraphMessages = paragraphMessages;
  protected readonly ActionButtonName = ActionButtonName;
}
