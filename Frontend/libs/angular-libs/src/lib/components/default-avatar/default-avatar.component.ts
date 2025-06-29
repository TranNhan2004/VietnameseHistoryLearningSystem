import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIcon } from '@ng-icons/core';

@Component({
  selector: 'lib-default-avatar',
  imports: [CommonModule, NgIcon],
  templateUrl: './default-avatar.component.html',
  styleUrl: './default-avatar.component.css',
})
export class DefaultAvatarComponent {
  @Input({ required: true }) name = '';
  @Input({ required: true }) isChangeAvatar = false;

  get firstLetter(): string {
    return this.name?.trim()?.charAt(0)?.toUpperCase() || '?';
  }
}
