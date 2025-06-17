import { Component } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { MyMetadata, UserService } from '@frontend/angular-libs';
import { fullRoleReader, initialAdmin, userMessage } from '@frontend/constants';
import { AuthenticationHelpers } from '@frontend/utils';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/module.d-CnjH8Dlt';
import { Admin, FullRoleType } from '@frontend/models';

@Component({
  selector: 'app-profile',
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  user: Admin = initialAdmin;
  fullRole: FullRoleType = 'ADMIN_BASIC';

  constructor(
    private myMetadata: MyMetadata,
    private userService: UserService,
    private toastrService: ToastrService
  ) {
    this.fullRole = AuthenticationHelpers.getUserInfo('ADMIN')
      ?.fullRole as FullRoleType;
  }

  ngOnInit() {
    this.myMetadata.set({
      title: 'LOTUS Admin | Hồ sơ của tôi',
      description:
        'Trang hồ sơ của tôi tại trang web hỗ trợ học tập lịch sử Việt Nam',
      keywords:
        'hồ sơ, profile, admin, lotus, lịch sử, histoty, việt nam, vietnam',
    });

    const userId = AuthenticationHelpers.getUserInfo('ADMIN')?.id as string;
    this.userService.getAdmin(userId + '_').subscribe({
      next: (res) => {
        this.user = res;
      },
      error: (err: HttpErrorResponse) => {
        const key = err.error.message as keyof typeof userMessage;
        this.toastrService.error(userMessage[key]);
      },
    });
  }

  protected readonly fullRoleReader = fullRoleReader;
}
