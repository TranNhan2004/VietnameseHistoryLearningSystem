import { FormGroup } from '@angular/forms';

export class MyFormGroupHelper {
  private formGroup: FormGroup;

  constructor(formGroup: FormGroup) {
    this.formGroup = formGroup;
  }

  hasError(path: string | string[], error: string) {
    return this.formGroup.get(path)?.errors?.[error];
  }

  isInvalid(path: string | string[]) {
    const control = this.formGroup.get(path);
    return control?.invalid && (control?.dirty || control?.touched);
  }
}
