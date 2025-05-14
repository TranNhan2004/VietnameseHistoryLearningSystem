import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyMetadata } from '@frontend/angular-libs';

@Component({
  selector: 'app-profile',
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  constructor(private myMetadata: MyMetadata) {}

  ngOnInit() {
    this.myMetadata.set({
      title: 'LOTUS Admin | Hồ sơ của tôi',
      description:
        'Trang hồ sơ của tôi tại trang web hỗ trợ học tập lịch sử Việt Nam',
      keywords:
        'hồ sơ, profile, admin, lotus, lịch sử, histoty, việt nam, vietnam',
    });
  }
}
