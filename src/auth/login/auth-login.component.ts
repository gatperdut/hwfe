import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { tap } from 'rxjs';
import { NavService } from '../../services/nav.service';
import { TypedForm } from '../../types/typed-form.type';
import { AuthService } from '../services/auth.service';
import { UserLoginDto } from './types/user-login-dto.type';

@Component({
  selector: 'hwfe-auth-login',
  imports: [ReactiveFormsModule, MatFormField, MatInputModule, RouterModule, MatButtonModule],
  templateUrl: './auth-login.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthLoginComponent {
  private formBuilder: FormBuilder = inject(FormBuilder);
  private authService: AuthService = inject(AuthService);
  private navService: NavService = inject(NavService);

  public formGroup: FormGroup<TypedForm<UserLoginDto>> = this.formBuilder.group({
    email: this.formBuilder.control('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
    password: this.formBuilder.control('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(6)],
    }),
  });

  public login(): void {
    this.authService
      .login(this.formGroup.getRawValue())
      .pipe(
        tap((): void => {
          this.navService.toDashboard();
        })
      )
      .subscribe();
  }
}
