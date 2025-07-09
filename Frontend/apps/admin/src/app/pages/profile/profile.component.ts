import { Component } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import {
  ActionButtonComponent,
  AuthenticationService,
  DefaultAvatarComponent,
  MyMetadataService,
  UserService,
} from '@frontend/angular-libs';
import {
  DATE_TIME_FORMAT,
  fullRoleReader,
  initialAdmin,
  userMessage,
} from '@frontend/constants';
import { AuthenticationHelpers } from '@frontend/utils';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/module.d-CnjH8Dlt';
import { ActionButtonName, Admin, FullRoleType } from '@frontend/models';
import { NgIcon } from '@ng-icons/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UpdateUserInfoComponent } from '../../components/update-user-info/update-user-info.component';
import { UpdatePasswordComponent } from '../../components/update-password/update-password.component';

@Component({
  selector: 'app-profile',
  imports: [
    CommonModule,
    ActionButtonComponent,
    DefaultAvatarComponent,
    DefaultAvatarComponent,
    NgIcon,
    NgOptimizedImage,
    ReactiveFormsModule,
    UpdateUserInfoComponent,
    UpdatePasswordComponent,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  user: Admin = initialAdmin;
  isChangeAvatar = false;

  protected userId: string;
  protected fullRole: FullRoleType = 'ADMIN_BASIC';

  editMode = false;

  constructor(
    private myMetadataService: MyMetadataService,
    private userService: UserService,
    private authenticationService: AuthenticationService,
    private toastrService: ToastrService,
    private router: Router
  ) {
    const userInfo = AuthenticationHelpers.getUserInfo('ADMIN');
    this.userId = userInfo?.id as string;
    this.fullRole = userInfo?.fullRole as FullRoleType;
  }

  ngOnInit() {
    this.myMetadataService.set({
      title: 'LOTUS Admin | Hồ sơ của tôi',
      description:
        'Trang hồ sơ của tôi tại trang web hỗ trợ học tập lịch sử Việt Nam',
      keywords:
        'hồ sơ, profile, admin, lotus, lịch sử, histoty, việt nam, vietnam',
    });

    this.userService.getAdmin(this.userId).subscribe({
      next: (res) => {
        this.user = res;
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
        const key = err.error.message as keyof typeof userMessage;
        this.toastrService.error(userMessage[key]);
      },
    });
  }

  toggleEditMode() {
    this.editMode = !this.editMode;
  }

  onAvatarSelected(event: Event) {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.isChangeAvatar = true;

      this.userService.updateAvatar(this.userId, file).subscribe({
        next: (res) => {
          this.user.avatarUrl = res.avatarUrl;
          this.toastrService.success(userMessage['UPDATE_AVATAR_SUCCESS']);
        },
        error: (err: HttpErrorResponse) => {
          console.log(err);
          const key = err.error.message as keyof typeof userMessage;
          this.toastrService.error(userMessage[key]);
        },
        complete: () => {
          this.isChangeAvatar = false;
        },
      });
    }
  }

  deleteAvatar() {
    this.isChangeAvatar = true;
    this.userService.deleteAvatar(this.userId).subscribe({
      next: () => {
        this.user.avatarUrl = '';
        this.toastrService.success(userMessage['DELETE_AVATAR_SUCCESS']);
      },
      error: (err: HttpErrorResponse) => {
        const key = err.error.message as keyof typeof userMessage;
        this.toastrService.error(userMessage[key]);
      },
      complete: () => {
        this.isChangeAvatar = false;
      },
    });
  }

  logout() {
    this.authenticationService.logout(this.fullRole).subscribe({
      next: async () => {
        await this.router.navigateByUrl('/auth/login');
      },
    });
  }

  protected readonly fullRoleReader = fullRoleReader;
  protected readonly DATE_TIME_FORMAT = DATE_TIME_FORMAT;
  protected readonly ActionButtonName = ActionButtonName;
}
