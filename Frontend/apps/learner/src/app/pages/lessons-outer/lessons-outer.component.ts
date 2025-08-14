import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  HistoricalPeriodService,
  MyMetadataService,
  SharedService,
} from '@frontend/angular-libs';
import { Router } from '@angular/router';
import {
  ActionButtonName,
  DisplayedData,
  HistoricalPeriodResponse,
} from '@frontend/models';
import { SearchComponent } from '../../components/search/search.component';
import { SortComponent } from '../../components/sort/sort.component';
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
    private myMetadataService: MyMetadataService,
    private historicalPeriodService: HistoricalPeriodService,
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
    this.myMetadataService.set({
      title: 'LOTUS | Bài học',
      description: 'Các bài học về lịch sử Việt Nam',
      keywords: 'bài học, lessons, lotus, lịch sử, histoty, việt nam, vietnam',
    });

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
