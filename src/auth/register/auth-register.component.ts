import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TypedForm } from '../../types/typed-form.type';
import { AuthService } from '../services/auth.service';
import { UserRegisterDto } from '../types/user-register-dto.type';

@Component({
  selector: 'hwfe-auth-register',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './auth-register.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthRegisterComponent {
  private formBuilder: FormBuilder = inject(FormBuilder);
  private authService: AuthService = inject(AuthService);

  public formGroup: FormGroup<TypedForm<UserRegisterDto>> = this.formBuilder.group({
    displayName: this.formBuilder.control('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    email: this.formBuilder.control('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    password: this.formBuilder.control('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  public register(): void {
    this.authService.register(this.formGroup.getRawValue()).subscribe((result): void => {
      console.log(result);
    });
  }
}
