import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HistoricalPeriodFormComponent } from '../../components/historical-period-form/historical-period-form.component';
import { FormGroup, Validators } from '@angular/forms';
import { MyFormGroupHelper } from '@frontend/utils';
import {
  AlertService,
  HistoricalPeriodService,
  MyFormBuilderService,
} from '@frontend/angular-libs';
import { HistoricalPeriod } from '@frontend/models';
import { ToastrService } from 'ngx-toastr';
import { historicalPeriodMessage } from '@frontend/constants';
import { HttpErrorResponse } from '@angular/common/module.d-CnjH8Dlt';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-historical-period',
  imports: [CommonModule, HistoricalPeriodFormComponent],
  templateUrl: './create-historical-period.component.html',
  styleUrl: './create-historical-period.component.css',
})
export class CreateHistoricalPeriodComponent {
  historicalPeriodForm: FormGroup;
  historicalPeriodFH: MyFormGroupHelper;

  constructor(
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
            historicalPeriodMessage['CREATE__SUCCESS']
          );
        },
        error: (err: HttpErrorResponse) => {
          const key = err.error.message as keyof typeof historicalPeriodMessage;
          this.toastrService.error(historicalPeriodMessage[key]);
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
