import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActionButtonComponent } from '@frontend/angular-libs';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MyFormGroupHelper } from '@frontend/utils';
import { ActionButtonName } from '@frontend/models';
import { lessonMessage } from '@frontend/constants';

@Component({
  selector: 'app-lesson-form',
  imports: [CommonModule, ActionButtonComponent, ReactiveFormsModule],
  templateUrl: './lesson-form.component.html',
  styleUrl: './lesson-form.component.css',
})
export class LessonFormComponent {
  @Input({ required: true }) formGroup!: FormGroup;
  @Input() formHelper!: MyFormGroupHelper;

  @Output() saveFn = new EventEmitter<void>();
  @Output() cancelFn = new EventEmitter<void>();
  protected readonly lessonMessage = lessonMessage;
  protected readonly ActionButtonName = ActionButtonName;
}
