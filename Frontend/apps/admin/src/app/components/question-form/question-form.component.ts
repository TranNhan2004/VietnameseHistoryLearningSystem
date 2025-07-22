import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActionButtonComponent, ControlOf } from '@frontend/angular-libs';
import {
  FormArray,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MyFormGroupHelper } from '@frontend/utils';
import { answerOptionMessages, questionMessages } from '@frontend/constants';
import { ActionButtonName, AnswerOption } from '@frontend/models';

@Component({
  selector: 'app-question-form',
  imports: [
    CommonModule,
    ActionButtonComponent,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './question-form.component.html',
  styleUrl: './question-form.component.css',
})
export class QuestionFormComponent {
  @Input({ required: true }) formGroup!: FormGroup;
  @Input() formHelper!: MyFormGroupHelper;

  @Output() saveFn = new EventEmitter<void>();
  @Output() cancelFn = new EventEmitter<void>();
  @Output() addAnswerOption = new EventEmitter<void>();
  @Output() deleteAnswerOption = new EventEmitter<string>();

  get answerOptionForms() {
    return this.formGroup.get('answerOptions') as FormArray<
      ControlOf<AnswerOption>
    >;
  }

  protected readonly questionMessages = questionMessages;
  protected readonly answerOptionMessages = answerOptionMessages;
  protected readonly ActionButtonName = ActionButtonName;
}
