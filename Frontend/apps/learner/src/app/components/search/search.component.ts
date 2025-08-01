import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIcon } from '@ng-icons/core';
import { DisplayedData } from '@frontend/models';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  imports: [CommonModule, NgIcon, FormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent {
  @Input({ required: true }) originalData: DisplayedData[] = [];
  @Input({ required: true }) searchKeys: (keyof DisplayedData)[] = [];
  @Input() placeholder = 'Nhập từ khóa để tìm kiếm…';

  @Output() filterData = new EventEmitter<DisplayedData[]>();

  searchTerm = '';

  onSearchChange() {
    const term = this.searchTerm.trim().toLowerCase();

    if (!term) {
      this.filterData.emit(this.originalData);
      return;
    }

    const filtered = this.originalData.filter((item) => {
      const combined = this.searchKeys
        .map((key) => String(item[key] ?? '').toLowerCase())
        .join(' ');
      return combined.includes(term);
    });

    this.filterData.emit(filtered);
  }

  onInput(event: Event) {
    this.searchTerm = (event.target as HTMLInputElement).value;
    this.onSearchChange();
  }
}
