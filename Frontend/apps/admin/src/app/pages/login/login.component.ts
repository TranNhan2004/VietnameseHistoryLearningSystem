import { Component, OnInit } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIcon } from '@ng-icons/core';
import {
  AuthenticationService,
  MyFormBuilderService,
  MyMetadataService,
  PasswordInputComponent,
} from '@frontend/angular-libs';
import {
  authenticationMessage,
  EMAIL_OR_USER_NAME_RE,
  generalMessage,
  PASSWORD_RE,
  userMessage,
} from '@frontend/constants';
import { AuthenticationHelpers, MyFormGroupHelper } from '@frontend/utils';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/module.d-CnjH8Dlt';
import { LoginRequest } from '@frontend/models';

@Component({
  selector: 'app-login',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgIcon,
    NgOptimizedImage,
    RouterLink,
    PasswordInputComponent,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  fh: MyFormGroupHelper;

  constructor(
    private myFBS: MyFormBuilderService,
    private myMetadatService: MyMetadataService,
    private authService: AuthenticationService,
    private toastrService: ToastrService,
    private router: Router
  ) {
    this.loginForm = this.myFBS.group<LoginRequest>({
      emailOrUserName: [
        '',
        [
          Validators.required,
          Validators.pattern(EMAIL_OR_USER_NAME_RE),
          Validators.maxLength(256),
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(PASSWORD_RE),
          Validators.minLength(8),
          Validators.maxLength(50),
        ],
      ],
      role: ['ADMIN'],
    });

    this.fh = new MyFormGroupHelper(this.loginForm);
  }

  ngOnInit() {
    this.myMetadatService.set({
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

  protected readonly userMessage = userMessage;
}
