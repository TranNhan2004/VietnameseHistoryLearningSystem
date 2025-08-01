import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AlertService,
  HistoricalPeriodService,
  SharedService,
} from '@frontend/angular-libs';
import { Router } from '@angular/router';
import {
  ActionButtonName,
  DisplayedData,
  DisplayedDataAction,
  HistoricalPeriodResponse,
} from '@frontend/models';
import { SearchComponent } from '../../components/search/search.component';
import { SortComponent } from '../../components/sort/sort.component';
import { HttpErrorResponse } from '@angular/common/module.d-CnjH8Dlt';
import { generalMessages, historicalPeriodMessages } from '@frontend/constants';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../environments/environment.dev';
import { toHistoricalYear } from '@frontend/utils';
import { CardComponent } from '../../components/card/card.component';

@Component({
  selector: 'app-lessons-outer',
  imports: [CommonModule, SearchComponent, SortComponent, CardComponent],
  templateUrl: './lessons-outer.component.html',
  styleUrl: './lessons-outer.component.css',
})
export class LessonsOuterComponent implements OnInit {
  historicalPeriods: HistoricalPeriodResponse[] = [];
  originialDisplayedData: DisplayedData[] = [];
  displayedData: DisplayedData[] = [];

  constructor(
    private historicalPeriodService: HistoricalPeriodService,
    private alertService: AlertService,
    private toastrService: ToastrService,
    private sharedService: SharedService,
    private router: Router
  ) {}

  getHistoricalPeriodString(data: DisplayedData) {
    return `Thời kỳ ${data['name']
      ?.toString()
      .toLowerCase()} (${toHistoricalYear(
      Number(data['startYear'])
    )} - ${toHistoricalYear(Number(data['endYear']))})`;
  }

  ngOnInit(): void {
    this.historicalPeriodService.getAll().subscribe({
      next: (res) => {
        this.historicalPeriods = [...res];
        this.originialDisplayedData = this.historicalPeriods.map((item) => ({
          id: item.id,
          name: item.name,
          startYear: item.startYear,
          endYear: item.endYear,
        }));
        this.displayedData = [...this.originialDisplayedData];
      },
    });
  }

  async actionClick(event: DisplayedDataAction) {
    switch (event.action) {
      case ActionButtonName.Info:
        await this.infoData(event.dataId);
        break;
      case ActionButtonName.Edit:
        await this.updateData(event.dataId);
        break;
      case ActionButtonName.Delete:
        await this.deleteData(event.dataId);
        break;
      case ActionButtonName.LinkTo:
        await this.goToRelatedLessons(event.dataId);
        break;
    }
  }

  async infoData(id: string) {
    await this.router.navigateByUrl(`/historical-periods/${id}`);
  }

  async updateData(id: string) {
    await this.router.navigateByUrl(`/historical-periods/${id}/edit`);
  }

  async deleteData(id: string) {
    await this.alertService.deleteWarning(() => {
      this.historicalPeriodService.delete(id).subscribe({
        next: () => {
          this.historicalPeriods = this.historicalPeriods.filter(
            (item) => item.id !== id
          );
          this.originialDisplayedData = this.originialDisplayedData.filter(
            (item) => item.id !== id
          );
          this.displayedData = [...this.originialDisplayedData];
          this.toastrService.success(
            historicalPeriodMessages['DELETE__SUCCESS']
          );
        },
        error: (err: HttpErrorResponse) => {
          if (!environment.production) {
            console.log(err);
          }

          if (err.status === 409) {
            this.toastrService.error(generalMessages['FOREIGN_KEY__VIOLATED']);
            return;
          }

          const key = err.error
            .message as keyof typeof historicalPeriodMessages;
          this.toastrService.error(historicalPeriodMessages[key]);
        },
      });
    });
  }

  async goToRelatedLessons(id: string) {
    const data = this.originialDisplayedData.find(
      (item) => item.id === id
    ) as DisplayedData;
    this.sharedService.put(id, this.getHistoricalPeriodString(data));
    await this.router.navigateByUrl(`/historical-periods/${id}/lessons`);
  }

  filterData(filtered: DisplayedData[]) {
    this.displayedData = [...filtered];
  }

  sortData(sorted: DisplayedData[]) {
    this.displayedData = [...sorted];
  }

  protected readonly ActionButtonName = ActionButtonName;
  protected readonly toHistoricalYear = toHistoricalYear;
  protected readonly Number = Number;
}
