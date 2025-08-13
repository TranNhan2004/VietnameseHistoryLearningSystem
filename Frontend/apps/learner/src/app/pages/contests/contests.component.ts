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
import {
  ActionButtonName,
  ContestResponse,
  DisplayedData,
} from '@frontend/models';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { CardComponent } from '../../components/card/card.component';

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

  constructor(
    private contestService: ContestService,
    private alertService: AlertService,
    private toastrService: ToastrService,
    private myMetadataService: MyMetadataService,
    private router: Router
  ) {}

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
  }

  safe(v: any) {
    return new Date(v as string);
  }

  filterData(filtered: DisplayedData[]) {
    this.displayedData = [...filtered];
  }

  sortData(sorted: DisplayedData[]) {
    this.displayedData = [...sorted];
  }

  async goToDoContest(id: string) {
    await this.router.navigateByUrl(`/contests/${id}`);
  }

  protected readonly ActionButtonName = ActionButtonName;
  protected readonly Number = Number;
  protected readonly Date = Date;
}
