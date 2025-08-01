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
  authenticationMessages,
  EMAIL_OR_USER_NAME_RE,
  generalMessages,
  PASSWORD_RE,
  userMessages,
} from '@frontend/constants';
import { AuthenticationHelpers, MyFormGroupHelper } from '@frontend/utils';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/module.d-CnjH8Dlt';
import { LoginRequest } from '@frontend/models';
import { environment } from '../../environments/environment.dev';

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
      role: ['LEARNER'],
    });

    this.fh = new MyFormGroupHelper(this.loginForm);
  }

  ngOnInit() {
    this.myMetadatService.set({
      title: 'LOTUS | Đăng nhập',
      description: 'Đăng nhập vào trang web hỗ trợ học tập lịch sử Việt Nam',
      keywords: 'đăng nhập, login, lotus, lịch sử, histoty, việt nam, vietnam',
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const loginData = this.loginForm.value;
      this.authService.login(loginData).subscribe({
        next: async (res) => {
          const { accessToken, ...rest } = res;
          AuthenticationHelpers.saveAccessToken(accessToken, 'LEARNER');
          AuthenticationHelpers.saveUserInfo(rest, 'LEARNER');
          this.toastrService.success(authenticationMessages.LOGIN__SUCCESS);
          await this.router.navigateByUrl('/home');
        },
        error: (err: HttpErrorResponse) => {
          if (!environment.production) {
            console.log(err);
          }

          if (err.status === 404) {
            this.toastrService.error(authenticationMessages.LOGIN__FAILED);
          } else {
            this.toastrService.error(generalMessages.UNKNOWN_ERROR);
          }
        },
      });
    }
  }

  protected readonly userMessages = userMessages;
}
