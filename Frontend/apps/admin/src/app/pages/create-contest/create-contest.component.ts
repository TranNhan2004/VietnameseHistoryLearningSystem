import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContestFormComponent } from '../../components/contest-form/contest-form.component';
import { FormGroup, Validators } from '@angular/forms';
import { DateUtils, formatDateTime, MyFormGroupHelper } from '@frontend/utils';
import {
  AlertService,
  ContestService,
  MyFormBuilderService,
  MyMetadataService,
} from '@frontend/angular-libs';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Contest } from '@frontend/models';
import { HttpErrorResponse } from '@angular/common/module.d-CnjH8Dlt';
import { environment } from '../../environments/environment.dev';
import { contestMessages } from '@frontend/constants';

@Component({
  selector: 'app-create-contest',
  imports: [CommonModule, ContestFormComponent],
  templateUrl: './create-contest.component.html',
  styleUrl: './create-contest.component.css',
})
export class CreateContestComponent implements OnInit {
  contestForm: FormGroup;
  contestFH: MyFormGroupHelper;

  constructor(
    private myMetadataService: MyMetadataService,
    private myFB: MyFormBuilderService,
    private contestService: ContestService,
    private toastrService: ToastrService,
    private alertService: AlertService,
    private router: Router
  ) {
    const current = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    this.contestForm = this.myFB.group<Contest>({
      name: ['', [Validators.required, Validators.maxLength(512)]],
      description: ['', [Validators.maxLength(2048)]],
      durationInMinutes: [10, [Validators.required, Validators.min(10)]],
      startTime: [formatDateTime(current), [Validators.required]],
      endTime: [formatDateTime(tomorrow), [Validators.required]],
    });

    this.contestFH = new MyFormGroupHelper(this.contestForm);
  }

  ngOnInit() {
    this.myMetadataService.set({
      title: 'LOTUS Admin | Tạo tài khoản quản trị',
      description: 'Tạo và quản lý tài khoản admin trên hệ thống LOTUS',
      keywords:
        'tạo tài khoản, quản trị, admin, quản lý, lotus, hệ thống, Việt Nam',
    });
  }

  private resetForm() {
    const current = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    this.contestForm.setValue({
      name: '',
      description: '',
      durationInMinutes: 10,
      startTime: DateUtils.toLocalTimeStr(current),
      endTime: DateUtils.toLocalTimeStr(tomorrow),
    });

    this.contestForm.markAsPristine();
    this.contestForm.markAsUntouched();
  }

  save() {
    if (this.contestForm.valid) {
      const data: Contest = this.contestForm.value;
      data.startTime = DateUtils.toLocalTimeStr(new Date(data.startTime));
      data.endTime = DateUtils.toLocalTimeStr(new Date(data.endTime));
      this.contestService.create(data).subscribe({
        next: () => {
          this.resetForm();
          this.toastrService.success(contestMessages['CREATE__SUCCESS']);
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
}
