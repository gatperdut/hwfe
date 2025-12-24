import { ChangeDetectionStrategy, Component, inject, signal, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormField } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { tap } from 'rxjs';
import { NavService } from '../../services/nav.service';
import { TypedForm } from '../../types/typed-form.type';
import { emailValidator } from '../register/validators/email.validator';
import { AuthService } from '../services/auth.service';
import { UserLoginDto } from './types/user-login.dto';

@Component({
  selector: 'hwfe-auth-login',
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatInputModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './auth-login.component.html',
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthLoginComponent {
  private formBuilder = inject(FormBuilder);
  private authService = inject(AuthService);
  private navService = inject(NavService);

  public formGroup: FormGroup<TypedForm<UserLoginDto>> = this.formBuilder.group({
    email: this.formBuilder.control('', {
      nonNullable: true,
      validators: [Validators.required, emailValidator({ allow_display_name: false })],
    }),
    password: this.formBuilder.control('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(6)],
    }),
  });

  public passwordHidden: WritableSignal<boolean> = signal<boolean>(true);

  public login(): void {
    this.authService
      .login(this.formGroup.getRawValue())
      .pipe(
        tap({
          next: (): void => {
            this.navService.toDashboardUsers();
          },
        })
      )
      .subscribe();
  }

  public passwordHiddenToggle(): void {
    this.passwordHidden.set(!this.passwordHidden());
  }
}
