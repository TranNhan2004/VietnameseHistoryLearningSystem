import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  QuestionResponse,
  ResultAnswer,
  ResultResponse,
} from '@frontend/models';
import { AnswerQuestionsForContestComponent } from '../../components/answer-questions-for-contest/answer-questions-for-contest.component';
import {
  AlertService,
  ContestService,
  MyMetadataService,
  QuestionService,
  ResultAnswerService,
  ResultService,
} from '@frontend/angular-libs';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationHelpers, DateUtils } from '@frontend/utils';
import { HttpErrorResponse } from '@angular/common/module.d-CnjH8Dlt';
import { environment } from '../../environments/environment.dev';
import { initialResultResponse, RESULT_DATA_LSK } from '@frontend/constants';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-do-contest',
  imports: [CommonModule, AnswerQuestionsForContestComponent],
  templateUrl: './do-contest.component.html',
  styleUrl: './do-contest.component.css',
})
export class DoContestComponent implements OnInit {
  questionResponses: QuestionResponse[] = [];
  learnerId = '';
  resultResponse: ResultResponse = initialResultResponse;
  durationInMinutes = 0;

  constructor(
    private myMetadataService: MyMetadataService,
    private contestService: ContestService,
    private resultService: ResultService,
    private resultAnswerService: ResultAnswerService,
    private questionService: QuestionService,
    private alertService: AlertService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.learnerId = AuthenticationHelpers.getUserInfo('LEARNER')?.id ?? '';
  }

  ngOnInit() {
    this.myMetadataService.set({
      title: 'LOTUS | Làm bài thi',
      description:
        'Tham gia và làm bài thi trắc nghiệm về lịch sử Việt Nam trên hệ thống LOTUS',
      keywords:
        'làm bài thi, do contest, lotus, lịch sử, trắc nghiệm, học tập, Việt Nam',
    });

    const resultId = sessionStorage.getItem(RESULT_DATA_LSK);
    const contestId = this.route.snapshot.paramMap.get('id') ?? '';
    if (!resultId || !contestId) return;

    this.resultService
      .getById(resultId)
      .pipe(
        switchMap((resultRes) => {
          this.resultResponse = resultRes;

          return this.contestService.getById(contestId).pipe(
            switchMap((contestRes) => {
              this.durationInMinutes = contestRes.durationInMinutes;
              const contestQuestionIds = contestRes.contestQuestions.map(
                (q) => q.questionId
              );

              return this.questionService.getByIds({ ids: contestQuestionIds });
            })
          );
        })
      )
      .subscribe({
        next: (questions) => {
          this.questionResponses = [...questions];

          const start = DateUtils.toDate(
            this.resultResponse.startTime as string
          );
          const endTime = DateUtils.toLocalTimeStr(
            new Date(start.getTime() + this.durationInMinutes * 60 * 1000)
          );

          this.resultResponse = {
            ...this.resultResponse,
            endTime,
          };
        },
        error: (err: HttpErrorResponse) => {
          if (!environment.production) {
            console.log(err);
          }
        },
      });
  }

  safe(v: any) {
    console.log(JSON.stringify(this.resultResponse));
    return DateUtils.toDate(v as string);
  }

  saveResultAnswers(events: { answerIds: string[]; submitTime: string }) {
    const resAnswersData: ResultAnswer[] = events.answerIds.map((item) => ({
      resultId: this.resultResponse.id,
      answerOptionId: item,
    }));

    this.resultAnswerService.createBatch(resAnswersData).subscribe({
      next: () => {
        this.resultService
          .update(this.resultResponse.id, {
            endTime: events.submitTime,
          })
          .subscribe({
            next: async () => {
              await this.alertService.success(
                'Nộp bài thành công, vui lòng xem điểm ở mục "Kết quả thi"',
                async () => {
                  sessionStorage.removeItem(RESULT_DATA_LSK);
                  await this.router.navigateByUrl('/contests');
                }
              );
            },
          });
      },
      error: (err: HttpErrorResponse) => {
        if (!environment.production) {
          console.log(err);
        }
      },
    });
  }
}
