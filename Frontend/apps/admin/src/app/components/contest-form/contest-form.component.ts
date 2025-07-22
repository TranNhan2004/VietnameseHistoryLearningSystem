import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MyFormGroupHelper } from '@frontend/utils';
import { ActionButtonName } from '@frontend/models';
import { contestMessages, questionMessages } from '@frontend/constants';
import {
  ActionButtonComponent,
  FlatpickrDirective,
} from '@frontend/angular-libs';

@Component({
  selector: 'app-contest-form',
  imports: [
    CommonModule,
    ActionButtonComponent,
    ReactiveFormsModule,
    FlatpickrDirective,
  ],
  templateUrl: './contest-form.component.html',
  styleUrl: './contest-form.component.css',
})
export class ContestFormComponent {
  @Input({ required: true }) formGroup!: FormGroup;
  @Input() formHelper!: MyFormGroupHelper;

  @Output() saveFn = new EventEmitter<void>();
  @Output() cancelFn = new EventEmitter<void>();

  isInvalidTime() {
    return (
      new Date(this.formGroup.get('endTime')?.value) <=
      new Date(this.formGroup.get('startTime')?.value)
    );
  }

  protected readonly contestMessages = contestMessages;
  protected readonly ActionButtonName = ActionButtonName;
  protected readonly questionMessages = questionMessages;
}
