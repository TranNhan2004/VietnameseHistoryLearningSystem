import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, Validators } from '@angular/forms';
import { AuthenticationHelpers, MyFormGroupHelper } from '@frontend/utils';
import {
  AlertService,
  LessonService,
  MyFormBuilderService,
  QuestionService,
} from '@frontend/angular-libs';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import {
  IdsRequest,
  ImageResponse,
  Lesson,
  LessonResponse,
  ParagraphResponse,
  UpdateAnswerOption,
  UpdateQuestion,
} from '@frontend/models';
import {
  initialContestResponse,
  initialLessonResponse,
  lessonMessages,
  questionMessages,
} from '@frontend/constants';
import { HttpErrorResponse } from '@angular/common/module.d-CnjH8Dlt';
import { environment } from '../../environments/environment.dev';
import { LessonFormComponent } from '../../components/lesson-form/lesson-form.component';
import { ParagraphsComponent } from '../../components/paragraphs/paragraphs.component';
import { ImagesComponent } from '../../components/images/images.component';
import { QuestionsListComponent } from '../../components/questions-list/questions-list.component';

@Component({
  selector: 'app-update-lesson',
  imports: [
    CommonModule,
    LessonFormComponent,
    ParagraphsComponent,
    ImagesComponent,
    QuestionsListComponent,
  ],
  templateUrl: './update-lesson.component.html',
  styleUrl: './update-lesson.component.css',
})
export class UpdateLessonComponent implements OnInit {
  lessonForm: FormGroup;
  lessonFH: MyFormGroupHelper;
  lessonResponse: LessonResponse = initialLessonResponse;
  videoFile: File | null = null;
  videoUrl: string | null = null;
  displayedQuestionIds: IdsRequest = { ids: [] };
  selectedQuestionIds: IdsRequest = { ids: [] };

  constructor(
    private myFB: MyFormBuilderService,
    private lessonService: LessonService,
    private questionService: QuestionService,
    private toastrService: ToastrService,
    private alertService: AlertService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    const adminId = AuthenticationHelpers.getUserInfo('ADMIN')?.id ?? '';
    const historicalPeriodId =
      this.route.parent?.snapshot.paramMap.get('id') ?? '';

    this.lessonForm = this.myFB.group<Lesson>({
      title: ['', [Validators.required, Validators.maxLength(1024)]],
      description: ['', [Validators.required, Validators.maxLength(2048)]],
      adminId: [adminId],
      historicalPeriodId: [historicalPeriodId],
    });

    this.lessonFH = new MyFormGroupHelper(this.lessonForm);
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id') ?? '';
    this.lessonService.getById(id).subscribe({
      next: (res) => {
        this.lessonResponse = { ...res };
        this.lessonForm.setValue({
          ...this.lessonForm.value,
          title: this.lessonResponse.title,
          description: this.lessonResponse.description,
        });
        this.videoUrl = res.videoUrl;
        this.displayedQuestionIds = {
          ids: this.lessonResponse.questions.map((item) => item.id),
        };
      },
      error: async (err: HttpErrorResponse) => {
        if (!environment.production) {
          console.log(err);
        }

        if (err.status === 404) {
          await this.router.navigateByUrl('/404');
          return;
        }

        const key = err.error.message as keyof typeof lessonMessages;
        this.toastrService.error(lessonMessages[key]);
      },
    });
  }

  save() {
    if (this.lessonForm.valid) {
      const data: Lesson = this.lessonForm.value;

      const id = this.route.snapshot.paramMap.get('id') ?? '';

      this.lessonService.update(id, data).subscribe({
        next: () => {
          if (this.videoFile) {
            this.lessonService.uploadVideo(id, this.videoFile).subscribe({
              next: (res) => {
                this.videoUrl = res.videoUrl;
              },
              error: (err: HttpErrorResponse) => {
                if (!environment.production) {
                  console.log(err);
                }

                const key = err.error.message as keyof typeof lessonMessages;
                this.toastrService.error(lessonMessages[key]);
              },
            });
          }

          this.toastrService.success(lessonMessages['UPDATE__SUCCESS']);
        },
        error: (err: HttpErrorResponse) => {
          if (!environment.production) {
            console.log(err);
          }

          const key = err.error.message as keyof typeof lessonMessages;
          this.toastrService.error(lessonMessages[key]);
        },
      });
    }
  }

  videoFileChange(video: File | null) {
    this.videoFile = video;
  }

  deleteVideo() {
    const id = this.route.snapshot.paramMap.get('id') ?? '';

    if (this.videoFile) {
      this.videoFile = null;
      this.videoUrl = null;
      return;
    }

    if (this.videoUrl) {
      this.lessonService.deleteVideo(id).subscribe({
        next: () => {
          this.videoFile = null;
          this.videoUrl = null;
        },
        error: async (err: HttpErrorResponse) => {
          if (!environment.production) {
            console.log(err);
          }

          if (err.status === 404) {
            await this.router.navigateByUrl('/404');
          }

          const key = err.error.message as keyof typeof lessonMessages;
          this.toastrService.error(lessonMessages[key]);
        },
      });
    }
  }

  updatedParagraphs(paragraphs: ParagraphResponse[]) {
    this.lessonResponse.paragraphs = [...paragraphs];
  }

  updatedImages(images: ImageResponse[]) {
    this.lessonResponse.images = [...images];
  }

  async cancel() {
    await this.alertService.cancelWarning(async () => {
      const historicalPeriodId =
        this.route.parent?.snapshot.paramMap.get('id') ?? '';
      await this.router.navigateByUrl(
        `/historical-periods/${historicalPeriodId}/lessons`
      );
    });
  }

  selectedQuestionIdsChange(questionId: string) {
    this.selectedQuestionIds.ids.push(questionId);
  }

  saveSelectedQuestions() {
    this.questionService
      .updateForLesson({
        lessonId: this.lessonResponse.id,
        questionIds: this.selectedQuestionIds.ids,
      })
      .subscribe({
        next: () => {
          this.toastrService.success(
            questionMessages['UPDATE_FOR_LESSON__SUCCESS']
          );
          this.displayedQuestionIds = {
            ids: [
              ...this.displayedQuestionIds.ids,
              ...this.selectedQuestionIds.ids,
            ],
          };
        },
        error: (err: HttpErrorResponse) => {
          if (!environment.production) {
            console.log(err);
          }
        },
      });
  }

  async deleteQuestion(questionId: string) {
    await this.alertService.deleteWarning(() => {
      const temp = this.lessonResponse.questions.find(
        (item) => item.id === questionId
      );
      if (!temp) {
        return;
      }

      const data: UpdateQuestion = {
        content: temp.content,
        answerOptions: temp.answerOptions.map(
          (item) =>
            ({
              id: item.id,
              content: item.content,
              correct: item.correct,
            } as UpdateAnswerOption)
        ),
        lessonId: null,
      };

      this.questionService.update(temp.id, data).subscribe({
        next: () => {
          this.toastrService.success(
            questionMessages['DELETE_FOR_LESSON__SUCCESS']
          );
          this.displayedQuestionIds = {
            ids: this.displayedQuestionIds.ids.filter(
              (item) => item !== questionId
            ),
          };
        },
        error: (err: HttpErrorResponse) => {
          if (!environment.production) {
            console.log(err);
          }
        },
      });
    });
  }

  protected readonly contestResponse = initialContestResponse;
}
