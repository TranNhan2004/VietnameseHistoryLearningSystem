import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ActionButtonComponent,
  FavoriteLessonService,
  LearnerLessonAnswerService,
  LessonService,
  MyMetadataService,
  SharedService,
} from '@frontend/angular-libs';
import { ActivatedRoute, Router } from '@angular/router';
import {
  ActionButtonName,
  DisplayedData,
  LessonResponse,
} from '@frontend/models';
import { HttpErrorResponse } from '@angular/common/module.d-CnjH8Dlt';
import { SearchComponent } from '../../components/search/search.component';
import { SortComponent } from '../../components/sort/sort.component';
import { ToastrService } from 'ngx-toastr';
import { NgIcon } from '@ng-icons/core';
import { environment } from '../../environments/environment.dev';
import { AuthenticationHelpers, toHistoricalYear } from '@frontend/utils';
import { CardComponent } from '../../components/card/card.component';
import { favoriteLessonMessages } from '@frontend/constants';

@Component({
  selector: 'app-lessons',
  imports: [
    CommonModule,
    SearchComponent,
    SortComponent,
    NgIcon,
    CardComponent,
    ActionButtonComponent,
  ],
  templateUrl: './lessons.component.html',
  styleUrl: './lessons.component.css',
})
export class LessonsComponent implements OnInit {
  lessons: LessonResponse[] = [];
  originialDisplayedData: DisplayedData[] = [];
  displayedData: DisplayedData[] = [];
  favoritedLessonIds: string[] = [];
  studiedLessonIds: string[] = [];
  learnerId = '';

  constructor(
    private myMetadataService: MyMetadataService,
    private lessonService: LessonService,
    private favoriteLessonService: FavoriteLessonService,
    private learnerLessonAnswerService: LearnerLessonAnswerService,
    private toastrService: ToastrService,
    private sharedService: SharedService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.learnerId = AuthenticationHelpers.getUserInfo('LEARNER')?.id ?? '';
  }

  async ngOnInit() {
    this.myMetadataService.set({
      title: `LOTUS | Bài học - ${this.historicalPeriodHeader}`,
      description: 'Các bài học về lịch sử Việt Nam',
      keywords: 'bài học, lessons, lotus, lịch sử, histoty, việt nam, vietnam',
    });

    const historicalPeriodId =
      this.route.parent?.snapshot.paramMap.get('id') ?? '';

    if (!this.sharedService.has(historicalPeriodId)) {
      await this.router.navigateByUrl('/404');
    }

    this.lessonService
      .getAllByHistoricalPeriodId(historicalPeriodId)
      .subscribe({
        next: async (res) => {
          this.lessons = [...res];
          this.originialDisplayedData = this.lessons.map((item) => ({
            ...item,
          }));
          this.displayedData = [...this.originialDisplayedData];
        },
        error: (err: HttpErrorResponse) => {
          if (!environment.production) {
            console.log(err);
          }
        },
      });

    this.favoriteLessonService.getAllByLearner(this.learnerId).subscribe({
      next: (res) => {
        this.favoritedLessonIds = res.map((item) => item.lessonId);
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

  isStudied(item: DisplayedData) {
    return this.studiedLessonIds.includes(item.id);
  }

  get historicalPeriodHeader() {
    const id = this.route.parent?.snapshot.paramMap.get('id') ?? '';
    return this.sharedService.get(id);
  }

  filterData(filtered: DisplayedData[]) {
    this.displayedData = [...filtered];
  }

  sortData(sorted: DisplayedData[]) {
    this.displayedData = [...sorted];
  }

  goToDetailsPage(id: string) {
    this.lessonService.updateViews(id).subscribe({
      next: async () => {
        await this.router.navigate([id], { relativeTo: this.route });
      },
    });
  }

  saveFavorite(id: string) {
    this.favoriteLessonService
      .create({
        lessonId: id,
        learnerId: this.learnerId,
      })
      .subscribe({
        next: (res) => {
          this.favoritedLessonIds.push(res.lessonId);
          this.toastrService.success(favoriteLessonMessages['CREATE__SUCCESS']);
        },
        error: (err: HttpErrorResponse) => {
          if (!environment.production) {
            console.log(err);
          }
        },
      });
  }

  protected readonly ActionButtonName = ActionButtonName;
  protected readonly toHistoricalYear = toHistoricalYear;
  protected readonly Number = Number;
}
