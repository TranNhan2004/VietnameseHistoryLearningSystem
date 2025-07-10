import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ActionButtonComponent,
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
import { TableComponent } from '../../components/table/table.component';
import { toHistoricalYear } from '@frontend/utils';
import { SearchComponent } from '../../components/search/search.component';
import { SortComponent } from '../../components/sort/sort.component';
import { HttpErrorResponse } from '@angular/common/module.d-CnjH8Dlt';
import { historicalPeriodMessage } from '@frontend/constants';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-lessons-outer',
  imports: [
    CommonModule,
    ActionButtonComponent,
    TableComponent,
    SearchComponent,
    SortComponent,
  ],
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

  ngOnInit(): void {
    this.historicalPeriodService.getAll().subscribe({
      next: (res) => {
        this.historicalPeriods = [...res];
        this.originialDisplayedData = this.historicalPeriods.map((item) => ({
          _id: item.id,
          _name: item.name,
          _startYear: item.startYear,
          _endYear: item.endYear,
          'Tên thời kỳ': item.name,
          'Năm bắt đầu': toHistoricalYear(item.startYear),
          'Năm kết thúc': toHistoricalYear(item.endYear),
        }));
        this.displayedData = [...this.originialDisplayedData];
      },
    });
  }

  async actionClick(event: DisplayedDataAction) {
    switch (event.action) {
      case ActionButtonName.Add:
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
            (item) => item._id !== id
          );
          this.displayedData = [...this.originialDisplayedData];
          this.toastrService.success(
            historicalPeriodMessage['DELETE__SUCCESS']
          );
        },
        error: (err: HttpErrorResponse) => {
          const key = err.error.message as keyof typeof historicalPeriodMessage;
          this.toastrService.error(historicalPeriodMessage[key]);
        },
      });
    });
  }

  async goToRelatedLessons(id: string) {
    const data = this.originialDisplayedData.find(
      (item) => item._id === id
    ) as DisplayedData;
    this.sharedService.put(
      id,
      `Thời kỳ ${data['Tên thời kỳ']?.toString().toLowerCase()} (${
        data['Năm bắt đầu']
      } - ${data['Năm kết thúc']})`
    );
    await this.router.navigateByUrl(`/historical-periods/${id}/lessons`);
  }

  filterData(filtered: DisplayedData[]) {
    this.displayedData = [...filtered];
  }

  sortData(sorted: DisplayedData[]) {
    this.displayedData = [...sorted];
  }

  async goToAddHistoricalPeriodPage() {
    await this.router.navigateByUrl('/historical-periods/add');
  }

  protected readonly ActionButtonName = ActionButtonName;
}
