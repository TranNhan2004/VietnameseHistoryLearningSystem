import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ActionButtonComponent,
  AlertService,
  AuthenticationService,
  MyFormBuilderService,
  PasswordInputComponent,
} from '@frontend/angular-libs';
import { FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  EMAIL_RE,
  PASSWORD_RE,
  USER_NAME_RE,
  userMessages,
} from '@frontend/constants';
import { MyFormGroupHelper } from '@frontend/utils';
import { ActionButtonName, Admin } from '@frontend/models';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/module.d-CnjH8Dlt';
import { environment } from '../../environments/environment.dev';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-admin-account',
  imports: [
    CommonModule,
    PasswordInputComponent,
    ReactiveFormsModule,
    ActionButtonComponent,
  ],
  templateUrl: './create-admin-account.component.html',
  styleUrl: './create-admin-account.component.css',
})
export class CreateAdminAccountComponent {
  adminForm: FormGroup;
  adminFH: MyFormGroupHelper;

  constructor(
    private authenticationService: AuthenticationService,
    private toastrService: ToastrService,
    private alertService: AlertService,
    private router: Router,
    private myFB: MyFormBuilderService
  ) {
    this.adminForm = this.myFB.group<Admin>({
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
      role: ['ADMIN'],
      adminLevel: ['BASIC'],
    });

    this.adminFH = new MyFormGroupHelper(this.adminForm);
  }

  invalidConfirmPassword() {
    return (
      this.adminForm.get('confirmPassword')?.value !==
      this.adminForm.get('password')?.value
    );
  }

  signupForAdmin() {
    if (this.adminForm.valid) {
      const data: Admin = this.adminForm.value;

      this.authenticationService.signupAdmin(data).subscribe({
        next: (res) => {
          this.toastrService.success(userMessages['CREATE_NEW_ADMIN__SUCCESS']);
          this.adminForm.setValue({
            firstName: '',
            lastName: '',
            userName: '',
            email: '',
            password: '',
            confirmPassword: '',
            dateOfBirth: null,
            adminLevel: 'BASIC',
          });
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

  async cancel() {
    await this.alertService.cancelWarning(async () => {
      await this.router.navigateByUrl('/accounts');
    });
  }

  protected readonly userMessages = userMessages;
  protected readonly ActionButtonName = ActionButtonName;
}
