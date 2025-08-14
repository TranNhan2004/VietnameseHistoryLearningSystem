import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ActionButtonComponent,
  ContestService,
  MyMetadataService,
  ResultService,
  SharedService,
} from '@frontend/angular-libs';
import { SearchComponent } from '../../components/search/search.component';
import { SortComponent } from '../../components/sort/sort.component';
import {
  ActionButtonName,
  ContestQuestionResponse,
  ContestResponse,
  DisplayedData,
} from '@frontend/models';
import { Router } from '@angular/router';
import { CardComponent } from '../../components/card/card.component';
import {
  HAS_RESULT_CONTEST_IDS_LSK,
  RESULT_DATA_LSK,
} from '@frontend/constants';
import { AuthenticationHelpers, DateUtils } from '@frontend/utils';
import { HttpErrorResponse } from '@angular/common/module.d-CnjH8Dlt';
import { environment } from '../../environments/environment.dev';

@Component({
  selector: 'app-contests',
  imports: [
    CommonModule,
    SearchComponent,
    SortComponent,
    CardComponent,
    ActionButtonComponent,
  ],
  templateUrl: './contests.component.html',
  styleUrl: './contests.component.css',
})
export class ContestsComponent implements OnInit {
  contests: ContestResponse[] = [];
  originialDisplayedData: DisplayedData[] = [];
  displayedData: DisplayedData[] = [];
  hasResultContestIds: string[] = [];
  learnerId = '';

  constructor(
    private myMetadataService: MyMetadataService,
    private contestService: ContestService,
    private resultService: ResultService,
    private sharedService: SharedService,
    private router: Router
  ) {
    this.learnerId = AuthenticationHelpers.getUserInfo('LEARNER')?.id ?? '';
  }

  ngOnInit() {
    this.myMetadataService.set({
      title: 'LOTUS | Cuộc thi',
      description: 'Các bài thi trắc nghiệm về lịch sử Việt Nam',
      keywords:
        'cuộc thi, contests, lotus, lịch sử, histoty, việt nam, vietnam',
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

    this.resultService.getAllByLearner(this.learnerId).subscribe({
      next: (res) => {
        this.hasResultContestIds = res
          .filter((item) => item.endTime !== null)
          .map((item) => item.contestId);

        localStorage.setItem(
          HAS_RESULT_CONTEST_IDS_LSK,
          JSON.stringify(this.hasResultContestIds)
        );
      },
    });
  }

  safe(v: any) {
    return DateUtils.toDate(v as string);
  }

  filterData(filtered: DisplayedData[]) {
    this.displayedData = [...filtered];
  }

  sortData(sorted: DisplayedData[]) {
    this.displayedData = [...sorted];
  }

  canDoContest(id: string) {
    return !this.hasResultContestIds.includes(id);
  }

  saveToSessionStorage(key: string, value: any): Promise<void> {
    return new Promise((resolve) => {
      sessionStorage.setItem(key, value);
      resolve();
    });
  }

  async goToDoContest(id: string) {
    this.resultService
      .create({
        contestId: id,
        learnerId: this.learnerId,
        startTime: DateUtils.toLocalTimeStr(new Date()),
      })
      .subscribe({
        next: (res) => {
          this.saveToSessionStorage(RESULT_DATA_LSK, res.id).then(async () => {
            await this.router.navigateByUrl(`/contests/${id}`);
          });
        },
        error: (err: HttpErrorResponse) => {
          if (!environment.production) {
            console.log(err);
          }
        },
      });
  }

  getQuestionsLength(item: DisplayedData) {
    return (item['contestQuestions'] as ContestQuestionResponse[]).length;
  }

  getFullScore(item: DisplayedData) {
    const data = item['contestQuestions'] as ContestQuestionResponse[];
    return data.reduce((a, b) => a + b.point, 0);
  }

  protected readonly ActionButtonName = ActionButtonName;
  protected readonly Number = Number;
  protected readonly Date = Date;
}
