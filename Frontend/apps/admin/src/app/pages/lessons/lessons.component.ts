import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ActionButtonComponent,
  AlertService,
  LessonService,
  MyMetadataService,
  SharedService,
} from '@frontend/angular-libs';
import { ActivatedRoute, Router } from '@angular/router';
import {
  ActionButtonName,
  DisplayedData,
  DisplayedDataAction,
  LessonResponse,
} from '@frontend/models';
import { historicalPeriodMessage } from '@frontend/constants';
import { HttpErrorResponse } from '@angular/common/module.d-CnjH8Dlt';
import { SearchComponent } from '../../components/search/search.component';
import { SortComponent } from '../../components/sort/sort.component';
import { TableComponent } from '../../components/table/table.component';
import { ToastrService } from 'ngx-toastr';
import { NgIcon } from '@ng-icons/core';

@Component({
  selector: 'app-lessons',
  imports: [
    CommonModule,
    ActionButtonComponent,
    SearchComponent,
    SortComponent,
    TableComponent,
    NgIcon,
  ],
  templateUrl: './lessons.component.html',
  styleUrl: './lessons.component.css',
})
export class LessonsComponent implements OnInit {
  lessons: LessonResponse[] = [];
  originialDisplayedData: DisplayedData[] = [];
  displayedData: DisplayedData[] = [];

  constructor(
    private myMetadataService: MyMetadataService,
    private lessonService: LessonService,
    private toastrService: ToastrService,
    private alertService: AlertService,
    private sharedService: SharedService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.myMetadataService.set({
      title: 'LOTUS Admin | Quản lý bài học',
      description: 'Quản lý các bài học về lịch sử Việt Nam',
      keywords:
        'bài học, quản lý, lessons, manage, admin, lotus, lịch sử, histoty, việt nam, vietnam',
    });

    const historicalPeriodId =
      this.route.parent?.snapshot.paramMap.get('id') ?? '';

    this.lessonService
      .getAllByHistoricalPeriodId(historicalPeriodId)
      .subscribe({
        next: (res) => {
          this.lessons = [...res];
          this.originialDisplayedData = this.lessons.map((item) => ({
            _id: item.id,
            _title: item.title,
            _createdAt: item.createdAt,
            'Tiêu đề': item.title,
            'Mô tả': item.description,
            'Ngày tạo': item.createdAt,
            'Ngày cập nhật': item.updatedAt,
          }));
          this.displayedData = [...this.originialDisplayedData];
        },
      });
  }

  get historicalPeriodHeader() {
    const id = this.route.parent?.snapshot.paramMap.get('id') ?? '';
    return this.sharedService.get(id);
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
      this.lessonService.delete(id).subscribe({
        next: () => {
          this.lessons = this.lessons.filter((item) => item.id !== id);
          this.originialDisplayedData = this.originialDisplayedData.filter(
            (item) => item._id !== id
          );
          this.displayedData = [...this.originialDisplayedData];
          this.toastrService.success(
            historicalPeriodMessage['DELETE__SUCCESS']
          );
        },
        error: (err: HttpErrorResponse) => {
          console.log(err);
          const key = err.error.message as keyof typeof historicalPeriodMessage;
          this.toastrService.error(historicalPeriodMessage[key]);
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

  async goToAddLessonPage() {
    await this.router.navigate(['add'], { relativeTo: this.route });
  }

  protected readonly ActionButtonName = ActionButtonName;
}
