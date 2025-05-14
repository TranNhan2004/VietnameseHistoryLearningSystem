import { FormGroup } from '@angular/forms';

export class MyFormGroupHelper {
  private formGroup: FormGroup;

  constructor(formGroup: FormGroup) {
    this.formGroup = formGroup;
  }

  hasError(field: string, error: string) {
    return this.formGroup.get(field)?.errors?.[error];
  }

  isInvalid(field: string) {
    const control = this.formGroup.get(field);
    return control?.invalid && (control?.dirty || control?.touched);
  }
}
