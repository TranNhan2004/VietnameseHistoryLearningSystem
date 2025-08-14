import { Component, OnInit } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import {
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MyFormBuilderService,
  MyMetadataService,
  PasswordInputComponent,
  UserService,
  VerificationService,
} from '@frontend/angular-libs';
import { MyFormGroupHelper } from '@frontend/utils';
import { ResetPassword, SendOTP, Verification } from '@frontend/models';
import {
  EMAIL_RE,
  PASSWORD_RE,
  userMessages,
  verificationMessages,
} from '@frontend/constants';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/module.d-CnjH8Dlt';
import { Router, RouterLink } from '@angular/router';
import { environment } from '../../environments/environment.dev';

@Component({
  selector: 'app-reset-password',
  imports: [
    CommonModule,
    FormsModule,
    NgOptimizedImage,
    ReactiveFormsModule,
    RouterLink,
    PasswordInputComponent,
  ],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css',
})
export class ResetPasswordComponent implements OnInit {
  sendOTPForm: FormGroup;
  sendOTPFH: MyFormGroupHelper;
  isSending = false;

  verificationForm: FormGroup;
  verificationFH: MyFormGroupHelper;

  resetPasswordForm: FormGroup;
  resetPassowordFH: MyFormGroupHelper;

  resendOTPCountdown = 30;
  step = 1;

  constructor(
    private myMetadataService: MyMetadataService,
    private verificationService: VerificationService,
    private userService: UserService,
    private toastrService: ToastrService,
    private myFB: MyFormBuilderService,
    private router: Router
  ) {
    this.sendOTPForm = this.myFB.group<SendOTP>({
      email: [
        '',
        [
          Validators.required,
          Validators.maxLength(256),
          Validators.pattern(EMAIL_RE),
        ],
      ],
    });

    this.verificationForm = this.myFB.group<Verification>({
      email: [
        '',
        [
          Validators.required,
          Validators.maxLength(256),
          Validators.pattern(EMAIL_RE),
        ],
      ],
      otp: ['', [Validators.required]],
    });

    this.resetPasswordForm = this.myFB.group<ResetPassword>({
      email: [
        '',
        [
          Validators.required,
          Validators.maxLength(256),
          Validators.pattern(EMAIL_RE),
        ],
      ],
      newPassword: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(50),
          Validators.pattern(PASSWORD_RE),
        ],
      ],
      confirmNewPassword: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(50),
          Validators.pattern(PASSWORD_RE),
        ],
      ],
    });

    this.sendOTPFH = new MyFormGroupHelper(this.sendOTPForm);
    this.verificationFH = new MyFormGroupHelper(this.verificationForm);
    this.resetPassowordFH = new MyFormGroupHelper(this.resetPasswordForm);
  }

  ngOnInit() {
    this.myMetadataService.set({
      title: 'LOTUS | Đặt lại mật khẩu',
      description:
        'Giao diện để đặt lại mật khẩu tài khoản trên hệ thống hỗ trợ học tập lịch sử Việt Nam',
      keywords:
        'Đặt lại mật khẩu, reset password, lotus, lịch sử, học tập, Việt Nam',
    });
  }

  setCountdown() {
    const interval = setInterval(() => {
      this.resendOTPCountdown--;
      if (this.resendOTPCountdown <= 0) {
        clearInterval(interval);
      }
    }, 1000);
  }

  sendOtp() {
    if (this.sendOTPForm.valid) {
      this.isSending = true;
      const data = this.sendOTPForm.value as SendOTP;
      this.verificationService.sendOTPForResetPassword(data).subscribe({
        next: () => {
          this.verificationForm.setValue({
            email: data.email,
            otp: '',
          });

          this.toastrService.success(verificationMessages['SEND_OTP__SUCCESS']);
          this.isSending = false;
          this.step = 2;

          this.resendOTPCountdown = 30;
          this.setCountdown();
        },
        error: (err: HttpErrorResponse) => {
          if (!environment.production) {
            console.log(err);
          }

          if (err.status === 404) {
            const key = err.error.message as keyof typeof userMessages;
            this.toastrService.error(userMessages[key]);
            return;
          }

          this.toastrService.error(verificationMessages['SEND_OTP__FAILED']);
          this.isSending = false;
        },
      });
    }
  }

  verifyOTP() {
    if (this.verificationForm.valid) {
      const data = this.verificationForm.value as Verification;
      this.verificationService.verifyResetPassword(data).subscribe({
        next: () => {
          this.resetPasswordForm.setValue({
            email: data.email,
            newPassword: '',
            confirmNewPassword: '',
          });

          this.toastrService.success(
            verificationMessages['VERIFY_OTP__SUCCESS']
          );
          this.step = 3;
        },
        error: (err: HttpErrorResponse) => {
          if (!environment.production) {
            console.log(err);
          }

          if (err.status === 500) {
            const key = err.error.message as keyof typeof verificationMessages;
            this.toastrService.error(verificationMessages[key]);
          }
        },
      });
    }
  }

  resetPassword() {
    if (this.resetPasswordForm.valid) {
      const data = this.resetPasswordForm.value as ResetPassword;
      this.userService.resetPassword(data).subscribe({
        next: async () => {
          this.toastrService.success(userMessages['PASSWORD__RESET_SUCCESS']);
          await this.router.navigateByUrl('/auth/login');
        },
        error: (err: HttpErrorResponse) => {
          if (!environment.production) {
            console.log(err);
          }

          if (err.status === 404) {
            const key = err.error.message as keyof typeof userMessages;
            this.toastrService.error(userMessages[key]);
          }
        },
      });
    }
  }

  protected readonly userMessages = userMessages;
  protected readonly verificationMessages = verificationMessages;
}
