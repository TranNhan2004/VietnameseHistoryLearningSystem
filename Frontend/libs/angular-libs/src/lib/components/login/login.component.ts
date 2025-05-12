import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MyFormBuilder } from '../../services/my-form-builder.service';
import { LoginRequestType } from '@frontend/models';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  matEmailRound,
  matLockRound,
  matLoginRound,
} from '@ng-icons/material-icons/round';

@Component({
  selector: 'lib-login',
  imports: [CommonModule, ReactiveFormsModule, NgIcon],
  providers: [provideIcons({ matEmailRound, matLockRound, matLoginRound })],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private myFb: MyFormBuilder) {
    this.loginForm = this.myFb.group<LoginRequestType>({
      emailOrUserName: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  get emailOrUserName() {
    return this.loginForm.get('emailOrUserName');
  }

  get password() {
    return this.loginForm.get('password');
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const loginData = this.loginForm.value;
      console.log('Login data:', loginData);
    }
  }
}
