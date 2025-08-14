import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ContestService,
  MyMetadataService,
  ResultService,
} from '@frontend/angular-libs';
import { CardComponent } from '../../components/card/card.component';
import { SearchComponent } from '../../components/search/search.component';
import { SortComponent } from '../../components/sort/sort.component';
import {
  ContestResponse,
  DisplayedData,
  ResultResponse,
} from '@frontend/models';
import { AuthenticationHelpers, DateUtils } from '@frontend/utils';
import { HttpErrorResponse } from '@angular/common/module.d-CnjH8Dlt';
import { environment } from '../../environments/environment.dev';

@Component({
  selector: 'app-results',
  imports: [CommonModule, CardComponent, SearchComponent, SortComponent],
  templateUrl: './results.component.html',
  styleUrl: './results.component.css',
})
export class ResultsComponent implements OnInit {
  resultResponses: ResultResponse[] = [];
  contestResponses: ContestResponse[] = [];
  originialDisplayedData: DisplayedData[] = [];
  displayedData: DisplayedData[] = [];
  learnerId = '';

  constructor(
    private myMetadataService: MyMetadataService,
    private contestService: ContestService,
    private resultService: ResultService
  ) {
    this.learnerId = AuthenticationHelpers.getUserInfo('LEARNER')?.id ?? '';
  }

  ngOnInit() {
    this.myMetadataService.set({
      title: 'LOTUS | Kết quả thi',
      description: 'Các kết quả bài thi trắc nghiệm về lịch sử Việt Nam',
      keywords:
        'cuộc thi, kết quả, contests, lotus, lịch sử, histoty, việt nam, vietnam, results',
    });

    this.resultService.getAllByLearner(this.learnerId).subscribe({
      next: (res) => {
        this.resultResponses = [...res];
        const hasResultContestIds = res
          .filter((item) => item.endTime !== null)
          .map((item) => item.contestId);

        this.contestService
          .getAllByIds({
            ids: hasResultContestIds,
          })
          .subscribe({
            next: (res) => {
              this.contestResponses = [...res];
              this.originialDisplayedData = this.contestResponses.map(
                (item) => {
                  const result = this.resultResponses.find(
                    (r) => r.contestId === item.id
                  );
                  const fullScore = item.contestQuestions.reduce(
                    (a, b) => a + b.point,
                    0
                  );

                  return {
                    id: item.id,
                    name: item.name,
                    score: result?.score ?? 0,
                    fullScore,
                    scoreIn100: ((result?.score ?? 0) / fullScore) * 100.0,
                    startTime: result?.startTime ?? '',
                    endTime: result?.endTime ?? null,
                    timeElapsed:
                      result?.endTime && result?.startTime
                        ? (DateUtils.toDate(result.endTime).getTime() -
                            DateUtils.toDate(result.startTime).getTime()) /
                          (1000 * 60)
                        : 0,
                  };
                }
              );
              this.displayedData = [...this.originialDisplayedData];
            },
            error: (err: HttpErrorResponse) => {
              if (!environment.production) {
                console.log(err);
              }
            },
          });
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
}
