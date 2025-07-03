import { Component, forwardRef, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIcon } from '@ng-icons/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'lib-password-input',
  imports: [CommonModule, NgIcon, ReactiveFormsModule],
  templateUrl: './password-input.component.html',
  styleUrl: './password-input.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PasswordInputComponent),
      multi: true,
    },
  ],
})
export class PasswordInputComponent implements ControlValueAccessor {
  @Input() inputId = '';
  @Input() inputPlaceholder = '';
  @Input() inputClass = '';
  @Input() inputNgClass: string | string[] | { [klass: string]: any } = '';
  @Input() inputReadonly = false;
  @Input() inputDisabled = false;

  @Input() containerClass = '';
  @Input() containerNgClass: string | string[] | { [klass: string]: any } = '';

  @Input() visibilityClass = '';
  @Input() visibilityNgClass: string | string[] | { [klass: string]: any } = '';

  isVisible = false;
  inputValue = '';

  onChange: any = () => {};
  onTouched: any = () => {};

  toggleVisibility() {
    this.isVisible = !this.isVisible;
  }

  onInput(event: Event) {
    const input = event.target as HTMLInputElement;
    this.inputValue = input.value;
    this.onChange(this.inputValue);
  }

  writeValue(value: string): void {
    this.inputValue = value ?? '';
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    // Optional
  }
}
