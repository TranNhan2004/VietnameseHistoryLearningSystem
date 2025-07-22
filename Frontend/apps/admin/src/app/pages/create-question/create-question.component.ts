import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormGroup, Validators } from '@angular/forms';
import { MyFormGroupHelper } from '@frontend/utils';
import {
  AlertService,
  MyFormBuilderService,
  QuestionService,
} from '@frontend/angular-libs';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AnswerOption, Question } from '@frontend/models';
import { questionMessages } from '@frontend/constants';
import { HttpErrorResponse } from '@angular/common/module.d-CnjH8Dlt';
import { QuestionFormComponent } from '../../components/question-form/question-form.component';
import { environment } from '../../environments/environment.dev';

@Component({
  selector: 'app-create-question',
  imports: [CommonModule, QuestionFormComponent],
  templateUrl: './create-question.component.html',
  styleUrl: './create-question.component.css',
})
export class CreateQuestionComponent {
  questionForm: FormGroup;
  questionFH: MyFormGroupHelper;

  constructor(
    private myFB: MyFormBuilderService,
    private questionService: QuestionService,
    private toastrService: ToastrService,
    private alertService: AlertService,
    private router: Router
  ) {
    this.questionForm = this.myFB.group<Question>({
      content: ['', [Validators.required]],
      lessonId: [null],
      answerOptions: this.myFB.array<AnswerOption>([
        this.myFB.group<AnswerOption>({
          content: ['', [Validators.required]],
          correct: [false],
        }),
        this.myFB.group<AnswerOption>({
          content: ['', [Validators.required]],
          correct: [false],
        }),
        this.myFB.group<AnswerOption>({
          content: ['', [Validators.required]],
          correct: [false],
        }),
        this.myFB.group<AnswerOption>({
          content: ['', [Validators.required]],
          correct: [false],
        }),
      ]),
    });

    this.questionFH = new MyFormGroupHelper(this.questionForm);
  }

  get answerOptionsArray() {
    return this.questionForm.get('answerOptions') as FormArray;
  }

  async deleteAnswerOption(name: string) {
    await this.alertService.deleteWarning(() => {
      this.answerOptionsArray.removeAt(Number(name));
    });
  }

  addAnswerOption() {
    this.answerOptionsArray.push(
      this.myFB.group<AnswerOption>({
        content: ['', [Validators.required]],
        correct: [false],
      })
    );
  }

  private resetForm() {
    const answerOptions = this.myFB.array<AnswerOption>([
      this.myFB.group<AnswerOption>({
        content: ['', [Validators.required]],
        correct: [false],
      }),
      this.myFB.group<AnswerOption>({
        content: ['', [Validators.required]],
        correct: [false],
      }),
      this.myFB.group<AnswerOption>({
        content: ['', [Validators.required]],
        correct: [false],
      }),
      this.myFB.group<AnswerOption>({
        content: ['', [Validators.required]],
        correct: [false],
      }),
    ]);

    this.questionForm.reset({
      content: '',
      lessonId: null,
    });
    this.questionForm.setControl('answerOptions', answerOptions);
    this.questionForm.markAsPristine();
    this.questionForm.markAsUntouched();
  }

  save() {
    if (this.questionForm.valid) {
      const data: Question = this.questionForm.value;
      const correctAnswerOption = data.answerOptions.find(
        (item) => item.correct
      );

      if (!correctAnswerOption) {
        this.toastrService.error(
          questionMessages['CORRECT_ANSWER_OPTION__REQUIRED']
        );
        return;
      }

      this.questionService.create(data).subscribe({
        next: () => {
          this.resetForm();
          this.toastrService.success(questionMessages['CREATE__SUCCESS']);
        },
        error: (err: HttpErrorResponse) => {
          if (!environment.production) {
            console.log(err);
          }

          const key = err.error.message as keyof typeof questionMessages;
          this.toastrService.error(questionMessages[key]);
        },
      });
    }
  }

  async cancel() {
    await this.alertService.cancelWarning(async () => {
      await this.router.navigateByUrl('/questions');
    });
  }
}
