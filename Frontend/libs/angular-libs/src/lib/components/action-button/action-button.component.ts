import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  matAddRound,
  matDeleteRound,
  matEditRound,
  matInfoRound,
} from '@ng-icons/material-icons/round';

const BUTTON_CONFIG = {
  add: {
    icon: 'matAddRound',
    color: 'border-green-300 hover:bg-green-100 text-green-500',
    title: 'Thêm mới',
  },
  edit: {
    icon: 'matDeleteRound',
    color: 'border-yellow-300 hover:bg-yellow-100 text-yellow-500',
    title: 'Chỉnh sửa',
  },
  delete: {
    icon: 'matEditRound',
    color: 'border-red-300 hover:bg-red-100 text-red-500',
    title: 'Xóa',
  },
  info: {
    icon: 'matInfoRound',
    color: 'border-blue-300 hover:bg-blue-100 text-blue-500',
    title: 'Xem',
  },
};

@Component({
  selector: 'lib-action-button',
  standalone: true,
  imports: [CommonModule, NgIcon],
  providers: [
    provideIcons({ matAddRound, matEditRound, matDeleteRound, matInfoRound }),
  ],
  templateUrl: './action-button.component.html',
  styleUrl: './action-button.component.css',
})
export class ActionButtonComponent {
  @Input({ required: true }) name!: keyof typeof BUTTON_CONFIG;
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
