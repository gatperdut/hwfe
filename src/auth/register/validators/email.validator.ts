import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import isEmail from 'validator/lib/isEmail';

export function emailValidator(options?: Parameters<typeof isEmail>[1]): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return null;
    }

    return isEmail(control.value, options) ? null : { email: true };
  };
}
