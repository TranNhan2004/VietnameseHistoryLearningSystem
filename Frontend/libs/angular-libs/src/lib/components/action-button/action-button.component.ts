import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

const BUTTON_CONFIG = {
  add: {
    icon: 'add',
    color: 'border-green-300 hover:bg-green-100 text-green-500',
    title: 'Thêm mới',
  },
  edit: {
    icon: 'edit',
    color: 'border-yellow-300 hover:bg-yellow-100 text-yellow-500',
    title: 'Chỉnh sửa',
  },
  delete: {
    icon: 'delete',
    color: 'border-red-300 hover:bg-red-100 text-red-500',
    title: 'Xóa',
  },
  info: {
    icon: 'info',
    color: 'border-blue-300 hover:bg-blue-100 text-blue-500',
    title: 'Xem',
  },
};

@Component({
  selector: 'lib-action-button',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './action-button.component.html',
  styleUrl: './action-button.component.css',
})
export class ActionButtonComponent {
  @Input() name!: keyof typeof BUTTON_CONFIG;
  @Input() disabled = false;
  @Input() isSubmit = false;
  @Input() class = '';

  @Output() btnClick = new EventEmitter<void>();

  get buttonConfig() {
    return BUTTON_CONFIG[this.name];
  }

  get buttonClass() {
    return `p-2 w-10 h-10 rounded-lg border-2 flex justify-center items-center ${
      this.disabled
        ? 'border-gray-300 bg-gray-200 text-gray-500 cursor-not-allowed'
        : this.buttonConfig.color
    } ${this.class}`;
  }
}
