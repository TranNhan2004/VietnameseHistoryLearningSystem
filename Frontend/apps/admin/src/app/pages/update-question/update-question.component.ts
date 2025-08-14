import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionFormComponent } from '../../components/question-form/question-form.component';
import { FormArray, FormGroup, Validators } from '@angular/forms';
import { MyFormGroupHelper } from '@frontend/utils';
import {
  AlertService,
  AnswerOptionService,
  MyFormBuilderService,
  MyMetadataService,
  QuestionService,
} from '@frontend/angular-libs';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import {
  QuestionResponse,
  UpdateAnswerOption,
  UpdateQuestion,
} from '@frontend/models';
import {
  answerOptionMessages,
  initialQuestionResponse,
  questionMessages,
} from '@frontend/constants';
import { HttpErrorResponse } from '@angular/common/module.d-CnjH8Dlt';
import { environment } from '../../environments/environment.dev';

@Component({
  selector: 'app-update-question',
  imports: [CommonModule, QuestionFormComponent],
  templateUrl: './update-question.component.html',
  styleUrl: './update-question.component.css',
})
export class UpdateQuestionComponent implements OnInit {
  questionForm: FormGroup;
  questionFH: MyFormGroupHelper;
  questionResponse: QuestionResponse = initialQuestionResponse;

  constructor(
    private myMetadataService: MyMetadataService,
    private myFB: MyFormBuilderService,
    private questionService: QuestionService,
    private answerOptionService: AnswerOptionService,
    private toastrService: ToastrService,
    private alertService: AlertService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.myMetadataService.set({
      title: 'LOTUS Admin | Cập nhật câu hỏi',
      description: 'Chỉnh sửa các câu hỏi trắc nghiệm cho bài học',
      keywords: 'cập nhật câu hỏi, update question, admin, lotus, lịch sử',
    });

    this.questionForm = this.myFB.group<UpdateQuestion>({
      content: ['', [Validators.required]],
      lessonId: [null],
      answerOptions: this.myFB.array<UpdateAnswerOption>([]),
    });

    this.questionFH = new MyFormGroupHelper(this.questionForm);
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id') ?? '';
    this.questionService.getById(id).subscribe({
      next: (res) => {
        this.questionResponse = { ...res };
        this.questionForm.setValue({
          content: this.questionResponse.content,
          lessonId: this.questionResponse.lessonId,
          answerOptions: [],
        });

        const answerOptions = this.myFB.array<UpdateAnswerOption>(
          this.questionResponse.answerOptions.map((item) => {
            return this.myFB.group<UpdateAnswerOption>({
              id: [item.id],
              content: [item.content, [Validators.required]],
              correct: [item.correct],
            });
          })
        );

        this.questionForm.setControl('answerOptions', answerOptions);
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

  get answerOptionsArray() {
    return this.questionForm.get('answerOptions') as FormArray;
  }

  async deleteAnswerOption(name: string) {
    await this.alertService.deleteWarning(() => {
      const answerOption = this.answerOptionsArray.at(Number(name))
        .value as UpdateAnswerOption;

      if (answerOption.id) {
        this.answerOptionService.delete(answerOption.id).subscribe({
          next: () => {
            this.answerOptionsArray.removeAt(Number(name));
            this.toastrService.success(answerOptionMessages['DELETE__SUCCESS']);
          },
          error: (err: HttpErrorResponse) => {
            if (!environment.production) {
              console.log(err);
            }

            const key = err.error.message as keyof typeof answerOptionMessages;
            this.toastrService.error(answerOptionMessages[key]);
          },
        });
      } else {
        this.answerOptionsArray.removeAt(Number(name));
        this.toastrService.success(answerOptionMessages['DELETE__SUCCESS']);
      }
    });
  }

  addAnswerOption() {
    this.answerOptionsArray.push(
      this.myFB.group<UpdateAnswerOption>({
        id: [null],
        content: ['', [Validators.required]],
        correct: [false],
      })
    );
  }

  save() {
    if (this.questionForm.valid) {
      const data: UpdateQuestion = this.questionForm.value;
      const correctAnswerOption = data.answerOptions.find(
        (item) => item.correct
      );

      if (!correctAnswerOption) {
        this.toastrService.error(
          questionMessages['CORRECT_ANSWER_OPTION__REQUIRED']
        );
        return;
      }

      this.questionService.update(this.questionResponse.id, data).subscribe({
        next: () => {
          this.toastrService.success(questionMessages['UPDATE__SUCCESS']);
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
