import { Component, OnInit } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  matEmailRound,
  matLockRound,
  matLoginRound,
} from '@ng-icons/material-icons/round';
import {
  AuthenticationService,
  MyFormBuilder,
  MyMetadata,
} from '@frontend/angular-libs';
import { LoginRequestType } from '@frontend/models';
import {
  authenticationMessage,
  baseUserMessage,
  EMAIL_OR_USER_NAME_RE,
  generalMessage,
  PASSWORD_RE,
} from '@frontend/constants';
import { AuthenticationHelpers, MyFormGroupHelper } from '@frontend/utils';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/module.d-CnjH8Dlt';

@Component({
  selector: 'app-login',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgIcon,
    NgOptimizedImage,
    RouterLink,
  ],
  providers: [provideIcons({ matEmailRound, matLockRound, matLoginRound })],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  fh: MyFormGroupHelper;

  constructor(
    private myFb: MyFormBuilder,
    private myMetadata: MyMetadata,
    private authService: AuthenticationService,
    private toastrService: ToastrService,
    private router: Router
  ) {
    this.loginForm = this.myFb.group<LoginRequestType>({
      emailOrUserName: [
        '',
        [Validators.required, Validators.pattern(EMAIL_OR_USER_NAME_RE)],
      ],
      password: ['', [Validators.required, Validators.pattern(PASSWORD_RE)]],
      role: ['ADMIN'],
    });

    this.fh = new MyFormGroupHelper(this.loginForm);
  }

  ngOnInit() {
    this.myMetadata.set({
      title: 'LOTUS Admin | Đăng nhập',
      description:
        'Đăng nhập vào trang web admin hỗ trợ học tập lịch sử Việt Nam',
      keywords:
        'đăng nhập, login, admin, lotus, lịch sử, histoty, việt nam, vietnam',
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const loginData = this.loginForm.value;
      this.authService.login(loginData).subscribe({
        next: async (res) => {
          const { accessToken, ...rest } = res;
          AuthenticationHelpers.saveAccessToken(accessToken, 'ADMIN');
          AuthenticationHelpers.saveUserInfo(rest, 'ADMIN');
          this.toastrService.success(authenticationMessage.LOGIN__SUCCESS);
          await this.router.navigateByUrl('/home');
        },
        error: (err: HttpErrorResponse) => {
          if (err.status === 404) {
            this.toastrService.error(authenticationMessage.LOGIN__FAILED);
          } else {
            this.toastrService.error(generalMessage.UNKNOWN_ERROR);
          }
        },
      });
    }
  }

  protected readonly baseUserMessage = baseUserMessage;
}
