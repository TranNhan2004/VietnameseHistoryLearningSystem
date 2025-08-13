import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ActionButtonComponent,
  AlertService,
  FavoriteLessonService,
  LearnerLessonAnswerService,
  LessonService,
  MyMetadataService,
} from '@frontend/angular-libs';
import { CardComponent } from '../../components/card/card.component';
import { SearchComponent } from '../../components/search/search.component';
import { SortComponent } from '../../components/sort/sort.component';
import {
  ActionButtonName,
  DisplayedData,
  FavoriteLessonResponse,
  LessonResponse,
} from '@frontend/models';
import { favoriteLessonMessages, lessonMessages } from '@frontend/constants';
import { HttpErrorResponse } from '@angular/common/module.d-CnjH8Dlt';
import { environment } from '../../environments/environment.dev';
import { Router } from '@angular/router';
import { AuthenticationHelpers } from '@frontend/utils';
import { ToastrService } from 'ngx-toastr';
import { NgIcon } from '@ng-icons/core';

@Component({
  selector: 'app-favorite-lessons',
  imports: [
    CommonModule,
    ActionButtonComponent,
    CardComponent,
    SearchComponent,
    SortComponent,
    NgIcon,
  ],
  templateUrl: './favorite-lessons.component.html',
  styleUrl: './favorite-lessons.component.css',
})
export class FavoriteLessonsComponent implements OnInit {
  favoriteLessonResponses: FavoriteLessonResponse[] = [];
  lessonResponses: LessonResponse[] = [];
  originialDisplayedData: DisplayedData[] = [];
  displayedData: DisplayedData[] = [];
  studiedLessonIds: string[] = [];
  learnerId = '';

  constructor(
    private myMetadataService: MyMetadataService,
    private favoriteLessonService: FavoriteLessonService,
    private learnerLessonAnswerService: LearnerLessonAnswerService,
    private lessonService: LessonService,
    private alertService: AlertService,
    private toastrService: ToastrService,
    private router: Router
  ) {
    this.learnerId = AuthenticationHelpers.getUserInfo('LEARNER')?.id ?? '';
  }

  async ngOnInit() {
    this.myMetadataService.set({
      title: 'LOTUS | Bài học yêu thích',
      description: 'Các bài học yêu thích về lịch sử Việt Nam',
      keywords:
        'bài học, yêu thích, lessons, favorite, lotus, lịch sử, histoty, việt nam, vietnam',
    });

    this.favoriteLessonService.getAllByLearner(this.learnerId).subscribe({
      next: (res) => {
        this.favoriteLessonResponses = [...res];

        this.lessonService
          .getByIds({
            ids: this.favoriteLessonResponses.map((item) => item.lessonId),
          })
          .subscribe({
            next: (res) => {
              this.lessonResponses = [...res];
              this.originialDisplayedData = res.map((item) => ({ ...item }));
              this.displayedData = [...this.originialDisplayedData];
            },
            error: (err: HttpErrorResponse) => {
              if (!environment.production) {
                console.log(err);
              }
            },
          });
      },
      error: (err: HttpErrorResponse) => {
        if (!environment.production) {
          console.log(err);
        }
      },
    });

    this.learnerLessonAnswerService.getByLearner(this.learnerId).subscribe({
      next: (res) => {
        const lessonIds = res.map((item) => item.lessonId);
        this.studiedLessonIds = Array.from(new Set<string>(lessonIds));
      },
      error: (err: HttpErrorResponse) => {
        if (!environment.production) {
          console.log(err);
        }
      },
    });
  }

  async deleteData(id: string) {
    await this.alertService.deleteWarning(() => {
      const temp = this.favoriteLessonResponses.find(
        (item) => item.lessonId === id
      );
      if (!temp) {
        return;
      }

      this.favoriteLessonService.delete(temp.id).subscribe({
        next: () => {
          this.favoriteLessonResponses = this.favoriteLessonResponses.filter(
            (item) => item.id !== temp.id
          );
          this.lessonResponses = this.lessonResponses.filter(
            (item) => item.id !== temp.lessonId
          );
          this.originialDisplayedData = this.originialDisplayedData.filter(
            (item) => item.id !== temp.lessonId
          );
          this.displayedData = [...this.originialDisplayedData];
          this.toastrService.success(favoriteLessonMessages['DELETE__SUCCESS']);
        },
        error: (err: HttpErrorResponse) => {
          if (!environment.production) {
            console.log(err);
          }

          const key = err.error.message as keyof typeof lessonMessages;
          this.toastrService.error(lessonMessages[key]);
        },
      });
    });
  }

  isStudied(item: DisplayedData) {
    return this.studiedLessonIds.includes(item.id);
  }

  filterData(filtered: DisplayedData[]) {
    this.displayedData = [...filtered];
  }

  sortData(sorted: DisplayedData[]) {
    this.displayedData = [...sorted];
  }

  async goToDetailsPage(id: string) {
    const temp = this.lessonResponses.find((item) => item.id === id);
    await this.router.navigateByUrl(
      `/historical-periods/${temp?.historicalPeriodId}/lessons/${id}`
    );
  }

  protected readonly ActionButtonName = ActionButtonName;
}
