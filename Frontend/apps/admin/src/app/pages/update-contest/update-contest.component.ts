import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, Validators } from '@angular/forms';
import { DateUtils, formatDateTime, MyFormGroupHelper } from '@frontend/utils';
import {
  AlertService,
  ContestQuestionService,
  ContestService,
  MyFormBuilderService,
  MyMetadataService,
} from '@frontend/angular-libs';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/module.d-CnjH8Dlt';
import { environment } from '../../environments/environment.dev';
import {
  contestMessages,
  contestQuestionMessages,
  initialContestQuestionResponse,
  initialContestResponse,
} from '@frontend/constants';
import {
  Contest,
  ContestQuestionResponse,
  ContestResponse,
  IdsRequest,
} from '@frontend/models';
import { ContestFormComponent } from '../../components/contest-form/contest-form.component';
import { QuestionsListComponent } from '../../components/questions-list/questions-list.component';
import { UpdateContestQuestionComponent } from '../../components/update-contest-question/update-contest-question.component';

@Component({
  selector: 'app-update-contest',
  imports: [
    CommonModule,
    ContestFormComponent,
    QuestionsListComponent,
    UpdateContestQuestionComponent,
  ],
  templateUrl: './update-contest.component.html',
  styleUrl: './update-contest.component.css',
})
export class UpdateContestComponent implements OnInit {
  contestResponse: ContestResponse = initialContestResponse;
  displayedQuestionIds: IdsRequest = { ids: [] };
  selectedQuestionIds: IdsRequest = { ids: [] };
  contestForm: FormGroup;
  contestFH: MyFormGroupHelper;

  showUpdateContestQuestionModal = false;
  contestQuestionResponse: ContestQuestionResponse =
    initialContestQuestionResponse;

  constructor(
    private myMetadataService: MyMetadataService,
    private myFB: MyFormBuilderService,
    private contestService: ContestService,
    private contestQuestionService: ContestQuestionService,
    private toastrService: ToastrService,
    private alertService: AlertService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    const current = new Date();
    const tommorow = new Date();
    tommorow.setDate(new Date().getDate() + 1);

    this.contestForm = this.myFB.group<Contest>({
      name: ['', [Validators.required, Validators.maxLength(512)]],
      description: ['', [Validators.maxLength(2048)]],
      durationInMinutes: [10, [Validators.required, Validators.min(10)]],
      startTime: [formatDateTime(current), [Validators.required]],
      endTime: [formatDateTime(tommorow), [Validators.required]],
    });

    this.contestFH = new MyFormGroupHelper(this.contestForm);
  }

  ngOnInit(): void {
    this.myMetadataService.set({
      title: 'LOTUS Admin | Cập nhật cuộc thi',
      description: 'Chỉnh sửa thông tin và cài đặt các cuộc thi trắc nghiệm',
      keywords: 'cập nhật cuộc thi, update contest, admin, quản lý, lotus',
    });

    const id = this.route.snapshot.paramMap.get('id') ?? '';
    this.contestService.getById(id).subscribe({
      next: (res) => {
        this.contestResponse = { ...res };
        this.contestForm.setValue({
          name: res.name,
          description: res.description,
          durationInMinutes: res.durationInMinutes,
          startTime: (res.startTime as string) + ':00',
          endTime: (res.endTime as string) + ':00',
        });

        this.displayedQuestionIds = {
          ids: this.contestResponse.contestQuestions.map(
            (item) => item.questionId
          ),
        };
      },
      error: (err: HttpErrorResponse) => {
        if (!environment.production) {
          console.log(err);
        }

        const key = err.error.message as keyof typeof contestMessages;
        this.toastrService.error(contestMessages[key]);
      },
    });
  }

  save() {
    const id = this.route.snapshot.paramMap.get('id') ?? '';

    if (this.contestForm.valid) {
      const data: Contest = this.contestForm.value;
      data.startTime = DateUtils.toLocalTimeStr(new Date(data.startTime));
      data.endTime = DateUtils.toLocalTimeStr(new Date(data.endTime));
      this.contestService.update(id, data).subscribe({
        next: () => {
          this.toastrService.success(contestMessages['UPDATE__SUCCESS']);
        },
        error: async (err: HttpErrorResponse) => {
          if (!environment.production) {
            console.log(err);
          }

          if (err.status === 404) {
            await this.router.navigateByUrl('/404');
          }

          if (err.status === 409) {
            this.toastrService.error(contestMessages['NAME__UNIQUE']);
          }

          const key = err.error.message as keyof typeof contestMessages;
          this.toastrService.error(contestMessages[key]);
        },
      });
    }
  }

  async cancel() {
    await this.alertService.cancelWarning(async () => {
      await this.router.navigateByUrl('/contests');
    });
  }

  selectedQuestionIdsChange(questionId: string) {
    this.selectedQuestionIds.ids.push(questionId);
  }

  saveSelectedQuestions() {
    this.contestQuestionService
      .createBatch({
        contestId: this.contestResponse.id,
        questionIds: this.selectedQuestionIds.ids,
      })
      .subscribe({
        next: () => {
          this.toastrService.success(
            contestQuestionMessages['CREATE_BATCH__SUCCESS']
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

  closeUpdateModal() {
    this.showUpdateContestQuestionModal = false;
  }

  updateQuestion(questionId: string) {
    this.showUpdateContestQuestionModal = true;
    this.contestQuestionResponse = {
      ...(this.contestResponse.contestQuestions.find(
        (item) => item.questionId === questionId
      ) || initialContestQuestionResponse),
    };
  }

  updatedContestQuestion(item: ContestQuestionResponse) {
    this.contestResponse.contestQuestions =
      this.contestResponse.contestQuestions.map((cq) => {
        return cq.id === item.id ? item : cq;
      });
  }

  async deleteQuestion(questionId: string) {
    await this.alertService.deleteWarning(() => {
      const temp = this.contestResponse.contestQuestions.find(
        (item) => item.questionId === questionId
      );
      if (!temp) {
        return;
      }

      this.contestQuestionService.delete(temp.id).subscribe({
        next: () => {
          this.toastrService.success(
            contestQuestionMessages['DELETE__SUCCESS']
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
}
