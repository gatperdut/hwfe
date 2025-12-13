import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { TypedForm } from '../../types/typed-form.type';
import { AuthService } from '../services/auth.service';
import { UserRegisterDto } from './types/user-register-dto.type';
import { passwordMatchValidator } from './validators/password-match.validator';
@Component({
  selector: 'hwfe-auth-register',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    RouterModule,
    MatButtonModule,
  ],
  templateUrl: './auth-register.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthRegisterComponent {
  private formBuilder: FormBuilder = inject(FormBuilder);
  private authService: AuthService = inject(AuthService);

  public formGroup: FormGroup<TypedForm<UserRegisterDto>> = this.formBuilder.group(
    {
      displayName: this.formBuilder.control('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      email: this.formBuilder.control('', {
        nonNullable: true,
        validators: [Validators.required, Validators.email],
      }),
      password: this.formBuilder.control('', {
        nonNullable: true,
        validators: [Validators.required, Validators.minLength(6)],
      }),
      passwordConfirmation: this.formBuilder.control('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
    },
    { validators: passwordMatchValidator }
  );

  public register(): void {
    this.authService.register(this.formGroup.getRawValue()).subscribe((result): void => {
      console.log(result);
    });
  }
}
