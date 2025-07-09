import { Injectable } from '@angular/core';
import {
  AbstractControlOptions,
  FormControl,
  FormGroup,
  ValidatorFn,
} from '@angular/forms';

type ControlConfig<T> = [T | null, ValidatorFn[]?];

@Injectable({
  providedIn: 'root',
})
export class MyFormBuilderService {
  group<T extends Record<string, any>>(
    controlsConfig: { [K in keyof T]: ControlConfig<T[K]> },
    options?: AbstractControlOptions
  ): FormGroup<{ [K in keyof T]: FormControl<T[K] | null> }> {
    const controls = {} as { [K in keyof T]: FormControl<T[K] | null> };

    (Object.keys(controlsConfig) as Array<keyof T>).forEach((key) => {
      const [initialValue, validators] = controlsConfig[key];
      controls[key] = new FormControl<T[keyof T] | null>(
        initialValue,
        validators ?? []
      );
    });

    return new FormGroup(controls, options);
  }
}
