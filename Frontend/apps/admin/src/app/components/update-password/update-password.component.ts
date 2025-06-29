import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpdatePassword } from '@frontend/models';
import { PASSWORD_RE, userMessage } from '@frontend/constants';
import { FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthenticationHelpers, MyFormGroupHelper } from '@frontend/utils';
import {
  ActionButtonComponent,
  AlertService,
  MyFormBuilderService,
  PasswordInputComponent,
  UserService,
} from '@frontend/angular-libs';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/module.d-CnjH8Dlt';

@Component({
  selector: 'app-update-password',
  imports: [
    CommonModule,
    ActionButtonComponent,
    ReactiveFormsModule,
    PasswordInputComponent,
  ],
  templateUrl: './update-password.component.html',
  styleUrl: './update-password.component.css',
})
export class UpdatePasswordComponent implements OnChanges {
  @Input({ required: true }) editMode = false;
  @Output() logoutFn = new EventEmitter<void>();

  passwordForm: FormGroup;
  passwordFH: MyFormGroupHelper;

  private setDefaultPasswordForm() {
    this.passwordForm.setValue({
      oldPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    });
  }

  constructor(
    private userService: UserService,
    private toastrService: ToastrService,
    private myFBS: MyFormBuilderService,
    private alertService: AlertService
  ) {
    this.passwordForm = this.myFBS.group<UpdatePassword>({
      oldPassword: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(50),
          Validators.pattern(PASSWORD_RE),
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

    this.passwordFH = new MyFormGroupHelper(this.passwordForm);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.passwordForm.markAsPristine();
    this.passwordForm.markAsUntouched();

    if (!this.editMode) {
      this.setDefaultPasswordForm();
    }
  }

  async savePassword() {
    if (this.passwordForm.valid) {
      await this.alertService.info(
        'Bạn sẽ phải đăng nhập lại sau bước này',
        () => {
          const userId = AuthenticationHelpers.getUserInfo('ADMIN')
            ?.id as string;
          const data: UpdatePassword = this.passwordForm.value;
          this.userService.updatePassword(userId, data).subscribe({
            next: () => {
              this.toastrService.success(
                userMessage['UPDATE_PASSWORD_SUCCESS']
              );
              this.logoutFn.emit();
            },
            error: (err: HttpErrorResponse) => {
              const key = err.error.message as keyof typeof userMessage;
              this.toastrService.error(userMessage[key]);
            },
          });
        }
      );
    }
  }

  async cancelEditPassword() {
    await this.alertService.cancelWarning(() => {
      this.setDefaultPasswordForm();
    });
  }

  protected readonly userMessage = userMessage;
}
