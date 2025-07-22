import {
  AbstractControl,
  AbstractControlOptions,
  FormArray,
  FormControl,
  FormGroup,
  ValidatorFn,
} from '@angular/forms';
import { Injectable } from '@angular/core';

type ControlValue<T> = T | null;
export type ControlConfig<T> = [ControlValue<T>, ValidatorFn[]?] | ControlOf<T>;

export type ControlOf<T> = T extends Array<infer U>
  ? FormArray<ControlOf<U>>
  : T extends object
  ? FormGroup<{ [K in keyof T]: ControlOf<T[K]> }>
  : FormControl<T | null>;

@Injectable({
  providedIn: 'root',
})
export class MyFormBuilderService {
  group<T extends Record<string, any>>(
    controlsConfig: { [K in keyof T]: ControlConfig<T[K]> },
    options?: AbstractControlOptions
  ): ControlOf<T> {
    const controls: Record<string, AbstractControl> = {};

    for (const key in controlsConfig) {
      const config = controlsConfig[key];

      if (
        config instanceof FormControl ||
        config instanceof FormGroup ||
        config instanceof FormArray
      ) {
        controls[key] = config;
      } else {
        const [initialValue, validators] = config;
        controls[key] = new FormControl(initialValue, validators ?? []);
      }
    }

    return new FormGroup(controls, options) as unknown as ControlOf<T>;
  }

  array<T>(
    controls: ControlOf<T>[],
    validators?: ValidatorFn[]
  ): FormArray<ControlOf<T>> {
    return new FormArray(controls, validators);
  }
}
