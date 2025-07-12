import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActionButtonName, HistoricalPeriodResponse } from '@frontend/models';
import {
  ActionButtonComponent,
  HistoricalPeriodService,
} from '@frontend/angular-libs';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/module.d-CnjH8Dlt';
import {
  historicalPeriodMessages,
  initialHistoricalPeriodResponse,
} from '@frontend/constants';
import { ToastrService } from 'ngx-toastr';
import { toHistoricalYear } from '@frontend/utils';
import { environment } from '../../environments/environment.dev';

@Component({
  selector: 'app-edit-historical-period-details',
  imports: [CommonModule, FormsModule, ActionButtonComponent],
  templateUrl: './historical-period-details.component.html',
  styleUrl: './historical-period-details.component.css',
})
export class HistoricalPeriodDetailsComponent implements OnInit {
  historicalPeriod: HistoricalPeriodResponse = initialHistoricalPeriodResponse;

  constructor(
    private historicalPeriodService: HistoricalPeriodService,
    private toastrService: ToastrService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id') ?? '';
    this.historicalPeriodService.getById(id).subscribe({
      next: (res) => {
        this.historicalPeriod = { ...res };
      },
      error: async (err: HttpErrorResponse) => {
        if (!environment.production) {
          console.log(err);
        }

        if (err.status === 404) {
          await this.router.navigateByUrl('/404');
        }

        const key = err.error.message as keyof typeof historicalPeriodMessages;
        this.toastrService.error(historicalPeriodMessages[key]);
      },
    });
  }

  async cancel() {
    await this.router.navigateByUrl('/lessons-outer');
  }

  protected readonly toHistoricalYear = toHistoricalYear;
  protected readonly ActionButtonName = ActionButtonName;
}
