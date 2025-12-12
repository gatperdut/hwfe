import { AbstractControl, FormArray, FormControl, FormGroup } from '@angular/forms';

export type TypedForm<T> = {
  [P in keyof T]: // Arrays
  T[P] extends (infer U)[]
    ? FormArray<AbstractControl<U>>
    : // Nested objects
      T[P] extends object
      ? FormGroup<TypedForm<T[P]>>
      : // Primitive / leaf: reflect nullable or non-nullable
        FormControl<T[P]>;
};
