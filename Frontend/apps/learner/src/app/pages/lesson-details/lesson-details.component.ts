import {
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import {
  ImageResponse,
  LearnerLessonAnswer,
  LearnerLessonAnswerResponse,
  LessonResponse,
  ParagraphResponse,
} from '@frontend/models';
import {
  AlertService,
  LearnerLessonAnswerService,
  LessonService,
} from '@frontend/angular-libs';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/module.d-CnjH8Dlt';
import { environment } from '../../environments/environment.dev';
import { initialLessonResponse } from '@frontend/constants';
import { AnswerQuestionsForLessonComponent } from '../../components/answer-questions-for-lesson/answer-questions-for-lesson.component';
import { AuthenticationHelpers } from '@frontend/utils';
import { ShowAnswersComponent } from '../../components/show-answers/show-answers.component';

interface LessonContent {
  type: 'paragraph' | 'image';
  data: ParagraphResponse | ImageResponse;
}

@Component({
  selector: 'app-lesson-details',
  imports: [
    CommonModule,
    NgOptimizedImage,
    AnswerQuestionsForLessonComponent,
    ShowAnswersComponent,
  ],
  templateUrl: './lesson-details.component.html',
  styleUrl: './lesson-details.component.css',
})
export class LessonDetailsComponent implements OnInit {
  @ViewChild('container') container!: ElementRef<HTMLDivElement>;
  @ViewChildren('contentPart') contentParts!: QueryList<
    ElementRef<HTMLDivElement>
  >;

  title = '';
  videoUrl = '';
  lessonContents: LessonContent[] = [];
  lessonResponse: LessonResponse = initialLessonResponse;
  learnerLessonAnswerResponses: LearnerLessonAnswerResponse[] = [];
  progressPercent = 0;
  learnerId = '';

  constructor(
    private lessonService: LessonService,
    private learnerLessonAnswerService: LearnerLessonAnswerService,
    private alertService: AlertService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.learnerId = AuthenticationHelpers.getUserInfo('LEARNER')?.id ?? '';
  }

  asParagraphResponse(data: ParagraphResponse | ImageResponse) {
    return data as ParagraphResponse;
  }

  asImageResponse(data: ParagraphResponse | ImageResponse) {
    return data as ImageResponse;
  }

  ngOnInit() {
    const lessonId = this.route.snapshot.paramMap.get('id') ?? '';
    this.lessonService.getById(lessonId).subscribe({
      next: (res) => {
        this.lessonResponse = { ...res };
        this.lessonContents = [
          ...res.paragraphs.map(
            (p) => ({ data: p, type: 'paragraph' } as LessonContent)
          ),
          ...res.images.map(
            (i) => ({ data: i, type: 'image' } as LessonContent)
          ),
        ];

        this.title = res.title;
        this.videoUrl = res.videoUrl;
        this.lessonContents.sort(
          (a, b) => a.data.ordinalNumber - b.data.ordinalNumber
        );

        this.learnerLessonAnswerService
          .getByLearnerAndLesson(this.learnerId, this.lessonResponse.id)
          .subscribe({
            next: (res) => {
              this.learnerLessonAnswerResponses = [...res];
            },
            error: async (err: HttpErrorResponse) => {
              if (!environment.production) {
                console.log(err);
              }
            },
          });
      },
      error: async (err: HttpErrorResponse) => {
        if (!environment.production) {
          console.log(err);
        }

        if (err.status === 404) {
          await this.router.navigateByUrl('/404');
        }
      },
    });
  }

  hasAnswered() {
    return (
      this.learnerLessonAnswerResponses.length >=
      this.lessonResponse.questions.length
    );
  }

  get learnerAnswersIds() {
    return this.learnerLessonAnswerResponses.map((item) => item.answerOptionId);
  }

  saveLearnerLessonAnswer(answerOptionIds: string[]) {
    const data = answerOptionIds.map(
      (item) =>
        ({
          learnerId: this.learnerId,
          lessonId: this.lessonResponse.id,
          answerOptionId: item,
        } as LearnerLessonAnswer)
    );

    this.learnerLessonAnswerService.createBatch(data).subscribe({
      next: (res) => {
        this.learnerLessonAnswerResponses = [...res];
      },
      error: async (err: HttpErrorResponse) => {
        if (!environment.production) {
          console.log(err);
        }
      },
    });
  }

  onScroll() {
    const containerEl = this.container.nativeElement;
    const scrollTop = containerEl.scrollTop;
    const clientHeight = containerEl.clientHeight;
    const scrollHeight = containerEl.scrollHeight;

    this.progressPercent = Math.min(
      100,
      Math.max(0, (scrollTop / (scrollHeight - clientHeight)) * 100)
    );
  }

  async cancel() {
    await this.alertService.cancelWarning(async () => {
      await this.cancelShow();
    });
  }

  async cancelShow() {
    const historicalPeriodId =
      this.route.parent?.snapshot.paramMap.get('id') ?? '';
    await this.router.navigateByUrl(
      `/historical-periods/${historicalPeriodId}/lessons`
    );
  }
}
