import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AuthenticationService,
  MyFormBuilderService,
  PasswordInputComponent,
  VerificationService,
} from '@frontend/angular-libs';
import { FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MyFormGroupHelper } from '@frontend/utils';
import { Learner, LearnerResponse, Verification } from '@frontend/models';
import {
  EMAIL_RE,
  initialLearnerResponse,
  PASSWORD_RE,
  USER_NAME_RE,
  userMessages,
  verificationMessages,
} from '@frontend/constants';
import { HttpErrorResponse } from '@angular/common/module.d-CnjH8Dlt';
import { environment } from '../../environments/environment.dev';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    PasswordInputComponent,
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  learnerForm: FormGroup;
  learnerFH: MyFormGroupHelper;
  learnerResponse: LearnerResponse = initialLearnerResponse;
  verificationForm: FormGroup;
  verificationFH: MyFormGroupHelper;
  step = 1;
  isSending = false;
  resendOTPCountdown = 30;

  constructor(
    private authenticationService: AuthenticationService,
    private verificationService: VerificationService,
    private toastrService: ToastrService,
    private myFB: MyFormBuilderService,
    private router: Router
  ) {
    this.learnerForm = this.myFB.group<Learner>({
      firstName: ['', [Validators.required, Validators.maxLength(50)]],
      lastName: ['', [Validators.required, Validators.maxLength(100)]],
      userName: [
        '',
        [
          Validators.required,
          Validators.maxLength(64),
          Validators.pattern(USER_NAME_RE),
        ],
      ],
      email: [
        '',
        [
          Validators.required,
          Validators.maxLength(256),
          Validators.pattern(EMAIL_RE),
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(50),
          Validators.pattern(PASSWORD_RE),
        ],
      ],
      confirmPassword: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(50),
          Validators.pattern(PASSWORD_RE),
        ],
      ],
      dateOfBirth: [null],
      rank: ['BEGINNER'],
      point: [0],
      worstScore: [null],
      bestScore: [null],
      role: ['LEARNER'],
    });

    this.learnerFH = new MyFormGroupHelper(this.learnerForm);
    const stepStorage = sessionStorage.getItem('SIGNUP_STEP');

    if (stepStorage) {
      this.step = Number(stepStorage);
    } else {
      sessionStorage.setItem('SIGNUP_STEP', this.step.toString());
    }

    this.verificationForm = this.myFB.group<Verification>({
      email: [
        '',
        [
          Validators.required,
          Validators.maxLength(256),
          Validators.pattern(EMAIL_RE),
        ],
      ],
      otp: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
        ],
      ],
    });

    this.verificationFH = new MyFormGroupHelper(this.verificationForm);
  }

  setCountdown() {
    const interval = setInterval(() => {
      this.resendOTPCountdown--;
      if (this.resendOTPCountdown <= 0) {
        clearInterval(interval);
      }
    }, 1000);
  }

  sendOTP() {
    this.isSending = true;
    this.verificationService
      .sendOTPForVerifyAccount({
        email: this.learnerResponse.email,
      })
      .subscribe({
        next: () => {
          this.step = 2;
          sessionStorage.setItem('SIGN_UP', this.step.toString());
          this.isSending = false;

          this.resendOTPCountdown = 30;
          this.setCountdown();
        },
        error: (err: HttpErrorResponse) => {
          if (!environment.production) {
            console.log(err);
          }

          if (err.status === 500) {
            const key = err.error.message as keyof typeof verificationMessages;
            this.toastrService.error(verificationMessages[key]);
          }

          this.isSending = false;
        },
      });
  }

  signupAndSendOTP() {
    if (this.learnerForm.valid) {
      const data: Learner = this.learnerForm.value;

      this.authenticationService.signupLearner(data).subscribe({
        next: (res) => {
          this.learnerResponse = { ...res };
          this.verificationForm.setValue({
            email: this.learnerResponse.email,
            otp: '',
          });
          this.sendOTP();
        },
        error: (err: HttpErrorResponse) => {
          if (!environment.production) {
            console.log(err);
          }

          if (err.status === 500) {
            const key = err.error.message as keyof typeof userMessages;
            this.toastrService.error(userMessages[key]);
          }
        },
      });
    }
  }

  verifyAccount() {
    if (this.verificationForm.valid) {
      const data: Verification = this.verificationForm.value;

      this.verificationService.verifyAccount(data).subscribe({
        next: async () => {
          this.toastrService.success(
            verificationMessages['VERIFY_OTP__SUCCESS']
          );
          sessionStorage.removeItem('SIGNUP_STEP');
          await this.router.navigateByUrl('/auth/login');
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

  protected readonly userMessages = userMessages;
  protected readonly verificationMessages = verificationMessages;
}
