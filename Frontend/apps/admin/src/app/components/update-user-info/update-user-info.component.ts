import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActionButtonName, Admin, UpdateUserInfo } from '@frontend/models';
import { initialAdmin, userMessage } from '@frontend/constants';
import { MyFormGroupHelper } from '@frontend/utils';
import {
  ActionButtonComponent,
  AlertService,
  MyFormBuilderService,
  UserService,
} from '@frontend/angular-libs';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/module.d-CnjH8Dlt';

@Component({
  selector: 'app-update-user-info',
  imports: [CommonModule, ReactiveFormsModule, ActionButtonComponent],
  templateUrl: './update-user-info.component.html',
  styleUrl: './update-user-info.component.css',
})
export class UpdateUserInfoComponent implements OnChanges {
  @Input({ required: true }) editMode = false;
  @Input({ required: true }) user: Admin = initialAdmin;
  @Output() userChange = new EventEmitter<Admin>();

  userInfoForm: FormGroup;
  userInfoFH: MyFormGroupHelper;

  private setUserInfoForm() {
    this.userInfoForm.setValue({
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      dateOfBirth: this.user.dateOfBirth,
    });
  }

  constructor(
    private userService: UserService,
    private toastrService: ToastrService,
    private myFBS: MyFormBuilderService,
    private alertService: AlertService
  ) {
    this.userInfoForm = this.myFBS.group<UpdateUserInfo>({
      firstName: [
        this.user.firstName,
        [Validators.required, Validators.maxLength(50)],
      ],
      lastName: [
        this.user.lastName,
        [Validators.required, Validators.maxLength(100)],
      ],
      dateOfBirth: [this.user.dateOfBirth],
    });

    this.userInfoFH = new MyFormGroupHelper(this.userInfoForm);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.userInfoForm.markAsPristine();
    this.userInfoForm.markAsUntouched();

    if (!this.editMode) {
      this.setUserInfoForm();
    }
  }

  saveUserInfo() {
    if (this.userInfoForm.valid) {
      const data: UpdateUserInfo = this.userInfoForm.value;
      this.userService.updateInfo(this.user.id, data).subscribe({
        next: () => {
          this.toastrService.success(userMessage['UPDATE_INFO__SUCCESS']);
          this.userChange.emit({
            ...this.user,
            ...data,
          });
        },
        error: (err: HttpErrorResponse) => {
          const key = err.error.message as keyof typeof userMessage;
          this.toastrService.error(userMessage[key]);
        },
      });
    }
  }

  async cancelEditUserInfo() {
    await this.alertService.cancelWarning(() => {
      this.setUserInfoForm();
    });
  }

  protected readonly userMessage = userMessage;
  protected readonly ActionButtonComponent = ActionButtonComponent;
  protected readonly ActionButtonName = ActionButtonName;
}
