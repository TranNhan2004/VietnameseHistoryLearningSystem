import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DisplayedData, SortOption } from '@frontend/models';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sort',
  imports: [CommonModule, FormsModule],
  templateUrl: './sort.component.html',
  styleUrl: './sort.component.css',
})
export class SortComponent {
  @Input({ required: true }) originalData: DisplayedData[] = [];
  @Input({ required: true }) sortOptions: SortOption[] = [];
  @Output() sortData = new EventEmitter<DisplayedData[]>();

  selected = '';

  onSortChange() {
    if (!this.selected) {
      this.sortData.emit(this.originalData);
      return;
    }

    const [key, dir] = this.selected.split('|');
    const sorted = [...this.originalData].sort((a, b) => {
      const av = a[key];
      const bv = b[key];

      if (av == null && bv != null) return dir === 'asc' ? -1 : 1;
      if (av != null && bv == null) return dir === 'asc' ? 1 : -1;
      if (av == null && bv == null) return 0;

      if (typeof av === 'number' && typeof bv === 'number') {
        return dir === 'asc' ? av - bv : bv - av;
      }

      const avStr = String(av).toLowerCase();
      const bvStr = String(bv).toLowerCase();
      return dir === 'asc'
        ? avStr.localeCompare(bvStr)
        : bvStr.localeCompare(avStr);
    });

    this.sortData.emit(sorted);
  }
}
