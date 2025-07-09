import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HistoricalPeriodFormComponent } from '../../components/historical-period-form/historical-period-form.component';
import { FormGroup, Validators } from '@angular/forms';
import { MyFormGroupHelper } from '@frontend/utils';
import {
  AlertService,
  HistoricalPeriodService,
  MyFormBuilderService,
} from '@frontend/angular-libs';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { HistoricalPeriod } from '@frontend/models';
import { historicalPeriodMessage } from '@frontend/constants';
import { HttpErrorResponse } from '@angular/common/module.d-CnjH8Dlt';

@Component({
  selector: 'app-edit-historical-period',
  imports: [CommonModule, HistoricalPeriodFormComponent],
  templateUrl: './edit-historical-period.component.html',
  styleUrl: './edit-historical-period.component.css',
})
export class EditHistoricalPeriodComponent implements OnInit {
  historicalPeriodForm: FormGroup;
  historicalPeriodFH: MyFormGroupHelper;

  constructor(
    private myFB: MyFormBuilderService,
    private historicalPeriodService: HistoricalPeriodService,
    private toastrService: ToastrService,
    private alertService: AlertService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.historicalPeriodForm = this.myFB.group<HistoricalPeriod>({
      name: ['', [Validators.required, Validators.maxLength(1024)]],
      startYear: [0, [Validators.required]],
      endYear: [1, [Validators.required]],
    });

    this.historicalPeriodFH = new MyFormGroupHelper(this.historicalPeriodForm);
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id') ?? '';
    this.historicalPeriodService.getById(id).subscribe({
      next: (res) => {
        this.historicalPeriodForm.setValue({
          name: res.name,
          startYear: res.startYear,
          endYear: res.endYear,
        });
      },
      error: (err: HttpErrorResponse) => {
        const key = err.error.message as keyof typeof historicalPeriodMessage;
        this.toastrService.error(historicalPeriodMessage[key]);
      },
    });
  }

  save() {
    const id = this.route.snapshot.paramMap.get('id') ?? '';

    if (this.historicalPeriodForm.valid) {
      const data: HistoricalPeriod = this.historicalPeriodForm.value;
      this.historicalPeriodService.update(id, data).subscribe({
        next: () => {
          this.toastrService.success(
            historicalPeriodMessage['UPDATE__SUCCESS']
          );
        },
        error: async (err: HttpErrorResponse) => {
          if (err.status === 404) {
            await this.router.navigateByUrl('/404');
          }

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
