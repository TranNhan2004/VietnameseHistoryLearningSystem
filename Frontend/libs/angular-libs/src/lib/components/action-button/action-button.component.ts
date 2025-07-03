import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  matAddRound,
  matCloseRound,
  matDeleteRound,
  matEditRound,
  matFilterListRound,
  matInfoRound,
  matLockOpenRound,
  matLockRound,
  matSaveRound,
} from '@ng-icons/material-icons/round';

const BUTTON_CONFIG = {
  add: {
    icon: 'matAddRound',
    color: 'bg-my-green hover:bg-green-500',
    title: 'Thêm mới',
  },
  edit: {
    icon: 'matEditRound',
    color: 'bg-my-yellow hover:bg-yellow-500',
    title: 'Chỉnh sửa',
  },
  delete: {
    icon: 'matDeleteRound',
    color: 'bg-my-coralaccent hover:bg-red-500',
    title: 'Xóa',
  },
  info: {
    icon: 'matInfoRound',
    color: 'bg-my-blue hover:bg-blue-600',
    title: 'Xem',
  },
  save: {
    icon: 'matSaveRound',
    color: 'bg-my-blue hover:bg-blue-600',
    title: 'Lưu',
  },
  lock: {
    icon: 'matLockRound',
    color: 'bg-gray-600 hover:bg-gray-700',
    title: 'Khóa',
  },
  unlock: {
    icon: 'matLockOpenRound',
    color: 'bg-my-yellow hover:bg-yellow-500',
    title: 'Mở khóa',
  },
  filter: {
    icon: 'matFilterListRound',
    color: 'bg-my-blue hover:bg-blue-600',
    title: 'Lọc',
  },
  cancel: {
    icon: 'matCloseRound',
    color: 'bg-gray-400 hover:bg-gray-500',
    title: 'Hủy',
  },
};

@Component({
  selector: 'lib-action-button',
  standalone: true,
  imports: [CommonModule, NgIcon],
  providers: [
    provideIcons({
      matAddRound,
      matDeleteRound,
      matEditRound,
      matInfoRound,
      matSaveRound,
      matLockRound,
      matLockOpenRound,
      matFilterListRound,
      matCloseRound,
    }),
  ],
  templateUrl: './action-button.component.html',
  styleUrl: './action-button.component.css',
})
export class ActionButtonComponent {
  @Input({ required: true }) name!: keyof typeof BUTTON_CONFIG;
  @Input() mainTitle = '';
  @Input() disabled = false;
  @Input() isSubmit = false;
  @Input() class = '';
  @Input() title: string | undefined = undefined;

  @Output() btnClick = new EventEmitter<void>();

  get buttonConfig() {
    return BUTTON_CONFIG[this.name];
  }

  get buttonClass() {
    const mainTitleClass =
      this.mainTitle.trim() === '' ? 'p-2 w-10 h-10' : 'px-4 py-2 w-full';

    const disabledClass = this.disabled
      ? 'bg-gray-500 cursor-not-allowed'
      : this.buttonConfig.color;

    return `
        ${mainTitleClass} h-10 rounded-lg text-white flex justify-center items-center ${disabledClass}
        transition-all duration-300 ease-out transform hover:scale-105 hover:shadow-lg ${this.class}
      `;
  }

  get buttonTitle() {
    return this.title ?? this.buttonConfig.title;
  }
}
