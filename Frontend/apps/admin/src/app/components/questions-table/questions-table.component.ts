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
import { DisplayedData, QuestionResponse } from '@frontend/models';
import { NgIcon } from '@ng-icons/core';

@Component({
  selector: 'app-questions-table',
  imports: [CommonModule, NgIcon],
  templateUrl: './questions-table.component.html',
  styleUrl: './questions-table.component.css',
})
export class QuestionsTableComponent implements OnInit, OnChanges {
  @Input({ required: true }) displayedQuestions: DisplayedData[] = [];
  @Input() pageSize = 5;

  @Output() choose = new EventEmitter<string>();

  pagedData: DisplayedData[] = [];
  currentPage = 1;
  totalItems = 0;

  cast(item: DisplayedData) {
    return item as unknown as QuestionResponse;
  }

  ngOnInit(): void {
    this.totalItems = this.displayedQuestions?.length || 0;
    this.updatePagedData();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['displayedQuestions']) {
      this.totalItems = this.displayedQuestions?.length || 0;
      this.updatePagedData();
    }
  }

  updatePagedData() {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.pagedData = this.displayedQuestions?.slice(start, end) || [];
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

  protected readonly String = String;
}
