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
    title: 'Thêm mới',
  },
  save: {
    icon: 'matSaveRound',
    title: 'Lưu',
  },
  edit: {
    icon: 'matEditRound',
    title: 'Chỉnh sửa',
  },
  info: {
    icon: 'matInfoRound',
    title: 'Xem',
  },
  filter: {
    icon: 'matFilterListRound',
    title: 'Lọc',
  },
  delete: {
    icon: 'matDeleteRound',
    title: 'Xóa',
  },
  cancel: {
    icon: 'matCloseRound',
    title: 'Hủy',
  },
  lock: {
    icon: 'matLockRound',
    title: 'Khóa',
  },
  unlock: {
    icon: 'matLockOpenRound',
    title: 'Mở khóa',
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
  @Input() btnClass = '';
  @Input() title: string | undefined = undefined;

  @Output() btnClick = new EventEmitter<void>();

  get buttonConfig() {
    return BUTTON_CONFIG[this.name];
  }

  get buttonClass() {
    const mainTitleClass =
      this.mainTitle.trim() === '' ? 'p-2 w-10' : 'px-4 py-2 w-full';

    const disabledClass = this.disabled ? 'bg-gray-200 cursor-not-allowed' : '';

    return `
        ${mainTitleClass} h-10 rounded-lg flex justify-center items-center bg-white text-my-darknavy
        ${disabledClass} ${this.btnClass}
      `;
  }

  get buttonTitle() {
    return this.title ?? this.buttonConfig.title;
  }
}
