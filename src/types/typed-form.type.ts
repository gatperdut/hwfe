import { AbstractControl, FormArray, FormControl, FormGroup } from '@angular/forms';

export type TypedForm<T> = {
  [P in keyof T]: T[P] extends (infer U)[]
    ? FormArray<AbstractControl<U>>
    : T[P] extends object
      ? FormGroup<TypedForm<T[P]>>
      : FormControl<T[P] | null>;
};
