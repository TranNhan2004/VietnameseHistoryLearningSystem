import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIcon } from '@ng-icons/core';
import { ActionButtonName } from '@frontend/models';

const BUTTON_CONFIG: Record<ActionButtonName, { icon: string; title: string }> =
  {
    [ActionButtonName.Add]: {
      icon: 'matAddRound',
      title: 'Thêm mới',
    },
    [ActionButtonName.Save]: {
      icon: 'matSaveRound',
      title: 'Lưu',
    },
    [ActionButtonName.Edit]: {
      icon: 'matEditRound',
      title: 'Chỉnh sửa',
    },
    [ActionButtonName.Info]: {
      icon: 'matInfoRound',
      title: 'Chi tiết',
    },
    [ActionButtonName.Filter]: {
      icon: 'matFilterListRound',
      title: 'Lọc',
    },
    [ActionButtonName.Delete]: {
      icon: 'matDeleteRound',
      title: 'Xóa',
    },
    [ActionButtonName.Cancel]: {
      icon: 'matCloseRound',
      title: 'Hủy',
    },
    [ActionButtonName.Lock]: {
      icon: 'matLockRound',
      title: 'Khóa',
    },
    [ActionButtonName.Unlock]: {
      icon: 'matLockOpenRound',
      title: 'Mở khóa',
    },
    [ActionButtonName.LinkTo]: {
      icon: 'matArrowOutwardRound',
      title: 'Dẫn đến',
    },
    [ActionButtonName.ChangeAdminLevel]: {
      icon: 'matGroupsRound',
      title: 'Đổi cấp bậc quản trị',
    },
    [ActionButtonName.SubmitQuiz]: {
      icon: 'matPublishRound',
      title: 'Nộp bài',
    },
    [ActionButtonName.Favorite]: {
      icon: 'matFavoriteBorderRound',
      title: 'Thích',
    },
  };

@Component({
  selector: 'lib-action-button',
  standalone: true,
  imports: [CommonModule, NgIcon],
  templateUrl: './action-button.component.html',
  styleUrl: './action-button.component.css',
})
export class ActionButtonComponent {
  @Input({ required: true }) name!: ActionButtonName;
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
