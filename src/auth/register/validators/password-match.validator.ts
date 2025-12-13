import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { TypedForm } from '../../../types/typed-form.type';
import { UserRegisterDto } from '../types/user-register-dto.type';

export const passwordMatchValidator: ValidatorFn = (
  abstractControl: AbstractControl
): ValidationErrors | null => {
  const formGroup: FormGroup<TypedForm<UserRegisterDto>> = abstractControl as FormGroup<
    TypedForm<UserRegisterDto>
  >;

  const password: FormControl<string> = formGroup.controls.password;

  const passwordConfirmation: FormControl<string> = formGroup.controls.passwordConfirmation;

  let validationErrors: ValidationErrors | null = {
    ...(passwordConfirmation.errors || null),
    passwordMismatch: password.value === passwordConfirmation.value ? undefined : true,
  };

  validationErrors = Object.values(validationErrors).some(Boolean) ? validationErrors : null;

  formGroup.controls.passwordConfirmation.setErrors(validationErrors);

  return null;
};
