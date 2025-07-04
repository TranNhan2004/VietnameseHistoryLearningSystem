import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActionButtonComponent } from '@frontend/angular-libs';
import { Router } from '@angular/router';
import { HistoricalPeriodService } from '../../../../../../libs/angular-libs/src/lib/services/historical-period.service';
import { HistoricalPeriodResponse } from '@frontend/models';

@Component({
  selector: 'app-lessons-outer',
  imports: [CommonModule, ActionButtonComponent],
  templateUrl: './lessons-outer.component.html',
  styleUrl: './lessons-outer.component.css',
})
export class LessonsOuterComponent implements OnInit {
  historicalPeriods: HistoricalPeriodResponse[] = [];

  constructor(
    private historicalPeriodService: HistoricalPeriodService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.historicalPeriodService.getAll().subscribe({
      next: (res) => {
        this.historicalPeriods = [...res];
      },
    });
  }

  async goToAddHistoricalPeriodPage() {
    await this.router.navigateByUrl('add-historical-period');
  }
}
