import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ActionButtonComponent,
  AlertService,
  ContestService,
  MyMetadataService,
} from '@frontend/angular-libs';
import { SearchComponent } from '../../components/search/search.component';
import { SortComponent } from '../../components/sort/sort.component';
import { TableComponent } from '../../components/table/table.component';
import {
  ActionButtonName,
  ContestResponse,
  DisplayedData,
  DisplayedDataAction,
} from '@frontend/models';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { contestMessages, generalMessages } from '@frontend/constants';
import { HttpErrorResponse } from '@angular/common/module.d-CnjH8Dlt';
import { environment } from '../../environments/environment.dev';
import { DateUtils } from '@frontend/utils';

@Component({
  selector: 'app-contests',
  imports: [
    CommonModule,
    ActionButtonComponent,
    SearchComponent,
    SortComponent,
    TableComponent,
  ],
  templateUrl: './contests.component.html',
  styleUrl: './contests.component.css',
})
export class ContestsComponent implements OnInit {
  contests: ContestResponse[] = [];
  originialDisplayedData: DisplayedData[] = [];
  displayedData: DisplayedData[] = [];

  constructor(
    private contestService: ContestService,
    private alertService: AlertService,
    private toastrService: ToastrService,
    private myMetadataService: MyMetadataService,
    private router: Router
  ) {}

  ngOnInit() {
    this.myMetadataService.set({
      title: 'LOTUS Admin | Quản lý cuộc thi',
      description: 'Quản lý các bài thi trắc nghiệm về lịch sử Việt Nam',
      keywords:
        'cuộc thi, quản lý, contests, manage, admin, lotus, lịch sử, histoty, việt nam, vietnam',
    });

    this.contestService.getAll().subscribe({
      next: (res) => {
        this.contests = [...res];
        this.originialDisplayedData = this.contests.map((item) => ({
          ...item,
        }));
        this.displayedData = [...this.originialDisplayedData];
      },
    });
  }

  safe(v: any) {
    return DateUtils.toDate(v as string);
  }

  async actionClick(event: DisplayedDataAction) {
    switch (event.action) {
      case ActionButtonName.Edit:
        await this.updateData(event.dataId);
        break;
      case ActionButtonName.Delete:
        await this.deleteData(event.dataId);
        break;
    }
  }

  async updateData(id: string) {
    await this.router.navigateByUrl(`/contests/${id}/edit`);
  }

  async deleteData(id: string) {
    await this.alertService.deleteWarning(() => {
      this.contestService.delete(id).subscribe({
        next: () => {
          this.contests = this.contests.filter((item) => item.id !== id);
          this.originialDisplayedData = this.originialDisplayedData.filter(
            (item) => item.id !== id
          );
          this.displayedData = [...this.originialDisplayedData];
          this.toastrService.success(contestMessages['DELETE__SUCCESS']);
        },
        error: (err: HttpErrorResponse) => {
          if (!environment.production) {
            console.log(err);
          }

          if (err.status === 409) {
            this.toastrService.error(generalMessages['FOREIGN_KEY__VIOLATED']);
            return;
          }

          const key = err.error.message as keyof typeof contestMessages;
          this.toastrService.error(contestMessages[key]);
        },
      });
    });
  }

  filterData(filtered: DisplayedData[]) {
    this.displayedData = [...filtered];
  }

  sortData(sorted: DisplayedData[]) {
    this.displayedData = [...sorted];
  }

  async goToAddContestPage() {
    await this.router.navigateByUrl('/contests/add');
  }

  protected readonly ActionButtonName = ActionButtonName;
  protected readonly Number = Number;
}
