import {
  AfterContentInit,
  Component,
  ContentChild,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  TemplateRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActionButtonComponent } from '@frontend/angular-libs';
import { isDate, isIsoDateString } from '@frontend/utils';
import {
  ActionButtonConfigForTable,
  DisplayedData,
  DisplayedDataAction,
} from '@frontend/models';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, ActionButtonComponent],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
})
export class TableComponent implements OnInit, OnChanges, AfterContentInit {
  @Input({ required: true }) displayedData: DisplayedData[] = [];
  @Input({ required: true }) actionButtonConfigs: ActionButtonConfigForTable[] =
    [];
  @Input() pageSize = 5;

  @Output() actionClick = new EventEmitter<DisplayedDataAction>();

  @ContentChild('itemTemplate') itemTemplate!: TemplateRef<any>;

  pagedData: DisplayedData[] = [];
  currentPage = 1;
  totalItems = 0;

  ngOnInit(): void {
    this.totalItems = this.displayedData?.length || 0;
    this.updatePagedData();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['displayedData']) {
      this.totalItems = this.displayedData?.length || 0;
      this.updatePagedData();
    }
  }

  ngAfterContentInit() {
    console.log('itemTemplate:', this.itemTemplate);
  }

  updatePagedData() {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.pagedData = this.displayedData?.slice(start, end) || [];
  }

  onPrev() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagedData();
    }
  }

  onNext() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagedData();
    }
  }

  goToPage(page: number) {
    if (page < 1 || page > this.totalPages || page === this.currentPage) return;
    this.currentPage = page;
    this.updatePagedData();
  }

  onActionClick(displayedDataAction: DisplayedDataAction) {
    this.actionClick.emit(displayedDataAction);
  }

  get fromItem() {
    return this.totalItems === 0
      ? 0
      : (this.currentPage - 1) * this.pageSize + 1;
  }

  get toItem() {
    const possible = this.currentPage * this.pageSize;
    return possible > this.totalItems ? this.totalItems : possible;
  }

  get totalPages() {
    return Math.ceil(this.totalItems / this.pageSize) || 1;
  }

  get pagesToShow(): number[] {
    const total = this.totalPages;
    const current = this.currentPage;
    const rangeSize = 5;
    const half = Math.floor(rangeSize / 2);

    let start = Math.max(1, current - half);
    let end = start + rangeSize - 1;

    if (end > total) {
      end = total;
      start = Math.max(1, end - rangeSize + 1);
    }

    const pages: number[] = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  }

  protected readonly isDate = isDate;
  protected readonly isIsoDateString = isIsoDateString;
}
