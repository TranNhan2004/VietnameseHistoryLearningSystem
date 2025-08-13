import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ActionButtonComponent,
  AlertService,
  QuestionService,
} from '@frontend/angular-libs';
import { PiCardComponent } from '../pi-card/pi-card.component';
import { SearchComponent } from '../search/search.component';
import {
  ActionButtonName,
  ContestQuestionResponse,
  DisplayedData,
  IdsRequest,
  QuestionResponse,
} from '@frontend/models';
import { SortComponent } from '../sort/sort.component';
import { QuestionsTableComponent } from '../questions-table/questions-table.component';
import { ModalComponent } from '../modal/modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgIcon } from '@ng-icons/core';
import { formatPointAllocationRule } from '@frontend/utils';

@Component({
  selector: 'app-questions-list',
  imports: [
    CommonModule,
    ActionButtonComponent,
    PiCardComponent,
    SearchComponent,
    SortComponent,
    QuestionsTableComponent,
    ModalComponent,
    ReactiveFormsModule,
    NgIcon,
  ],
  templateUrl: './questions-list.component.html',
  styleUrl: './questions-list.component.css',
})
export class QuestionsListComponent implements OnInit, OnChanges {
  @Input({ required: true }) title = '';
  @Input() noteAddModal = '';
  @Input() notUpdateQuestion = false;
  @Input() contestQuestionResponses: ContestQuestionResponse[] = [];
  @Input({ required: true }) displayedQuestionIds: IdsRequest = { ids: [] };
  @Output() selectedQuestionIdsChange = new EventEmitter();
  @Output() saveSelectedQuestion = new EventEmitter();
  @Output() updateQuestion = new EventEmitter<string>();
  @Output() deleteQuestion = new EventEmitter<string>();

  allQuestions: DisplayedData[] = [];
  originalAllQuestions: DisplayedData[] = [];
  displayedAllQuestions: DisplayedData[] = [];

  originalDisplayedData: DisplayedData[] = [];
  displayedData: DisplayedData[] = [];
  showAddModal = false;

  constructor(
    private alertService: AlertService,
    private questionService: QuestionService
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['displayedQuestionIds']) {
      this.questionService.getByIds(this.displayedQuestionIds).subscribe({
        next: (res) => {
          this.originalDisplayedData = res.map((item) => ({ ...item }));
          this.displayedData = [...this.originalDisplayedData];
          this.originalAllQuestions = this.allQuestions.filter(
            (item) => !this.displayedQuestionIds.ids.includes(item.id)
          );
          this.displayedAllQuestions = [...this.originalAllQuestions];
        },
      });
    }
  }

  ngOnInit() {
    this.questionService.getAll().subscribe({
      next: (res) => {
        this.allQuestions = res.map((item) => ({ ...item }));
        this.originalAllQuestions = [...this.allQuestions];
        this.displayedAllQuestions = [...this.originalAllQuestions];
      },
    });
  }

  cast(item: DisplayedData) {
    return item as unknown as QuestionResponse;
  }

  filterData(filtered: DisplayedData[]) {
    this.displayedData = [...filtered];
  }

  sortData(sorted: DisplayedData[]) {
    this.displayedData = [...sorted];
  }

  selectData() {
    this.showAddModal = true;
  }

  async closeAddModal() {
    await this.alertService.cancelWarning(() => {
      this.showAddModal = false;
    });
  }

  saveSelected() {
    this.saveSelectedQuestion.emit();
    this.showAddModal = false;
  }

  findContestQuestion(item: DisplayedData) {
    return this.contestQuestionResponses.find(
      (cq) => cq.questionId === item.id
    );
  }

  hasContest() {
    return this.contestQuestionResponses.length > 0;
  }

  getPoint(item: DisplayedData) {
    const cq = this.findContestQuestion(item);
    return cq ? cq.point : -1.0;
  }

  getFormattedPointAllocationRule(item: DisplayedData) {
    const cq = this.findContestQuestion(item);
    return cq ? formatPointAllocationRule(cq.pointAllocationRule) : '';
  }

  filterAllQuestions(filtered: DisplayedData[]) {
    this.displayedAllQuestions = [...filtered];
  }

  sortAllQuestions(sorted: DisplayedData[]) {
    this.displayedAllQuestions = [...sorted];
  }

  protected readonly ActionButtonName = ActionButtonName;
  protected readonly String = String;
}
