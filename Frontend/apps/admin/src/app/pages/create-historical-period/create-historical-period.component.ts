import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HistoricalPeriodFormComponent } from '../../components/historical-period-form/historical-period-form.component';
import { FormGroup, Validators } from '@angular/forms';
import { MyFormGroupHelper } from '@frontend/utils';
import {
  AlertService,
  HistoricalPeriodService,
  MyFormBuilderService,
  MyMetadataService,
} from '@frontend/angular-libs';
import { HistoricalPeriod } from '@frontend/models';
import { ToastrService } from 'ngx-toastr';
import { historicalPeriodMessages } from '@frontend/constants';
import { HttpErrorResponse } from '@angular/common/module.d-CnjH8Dlt';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-historical-period',
  imports: [CommonModule, HistoricalPeriodFormComponent],
  templateUrl: './create-historical-period.component.html',
  styleUrl: './create-historical-period.component.css',
})
export class CreateHistoricalPeriodComponent implements OnInit {
  historicalPeriodForm: FormGroup;
  historicalPeriodFH: MyFormGroupHelper;

  constructor(
    private myMetadataService: MyMetadataService,
    private myFB: MyFormBuilderService,
    private historicalPeriodService: HistoricalPeriodService,
    private toastrService: ToastrService,
    private alertService: AlertService,
    private router: Router
  ) {
    this.historicalPeriodForm = this.myFB.group<HistoricalPeriod>({
      name: ['', [Validators.required, Validators.maxLength(1024)]],
      startYear: [0, [Validators.required]],
      endYear: [1, [Validators.required]],
    });

    this.historicalPeriodFH = new MyFormGroupHelper(this.historicalPeriodForm);
  }

  ngOnInit() {
    this.myMetadataService.set({
      title: 'LOTUS Admin | Tạo thời kỳ lịch sử',
      description: 'Tạo và quản lý các thời kỳ lịch sử trong hệ thống LOTUS',
      keywords: 'tạo thời kỳ, lịch sử, admin, quản lý, lotus, Việt Nam',
    });
  }

  save() {
    if (this.historicalPeriodForm.valid) {
      const data: HistoricalPeriod = this.historicalPeriodForm.value;
      this.historicalPeriodService.create(data).subscribe({
        next: () => {
          this.historicalPeriodForm.setValue({
            name: '',
            startYear: 0,
            endYear: 1,
          });

          this.historicalPeriodForm.markAsPristine();
          this.historicalPeriodForm.markAsUntouched();

          this.toastrService.success(
            historicalPeriodMessages['CREATE__SUCCESS']
          );
        },
        error: (err: HttpErrorResponse) => {
          const key = err.error
            .message as keyof typeof historicalPeriodMessages;
          this.toastrService.error(historicalPeriodMessages[key]);
        },
      });
    }
  }

  async cancel() {
    await this.alertService.cancelWarning(async () => {
      await this.router.navigateByUrl('/lessons-outer');
    });
  }
}
