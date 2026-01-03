import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal, WritableSignal } from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { finalize, map, Observable, of, switchMap, tap, timer } from 'rxjs';
import { DashboardNavService } from '../../dashboard/services/dashboard-nav.service';
import { TypedForm } from '../../types/typed-form.type';
import { UserApiService } from '../../user-aux/services/user-api.service';
import { AuthService } from '../services/auth.service';
import { UserRegisterDto } from './types/user-register.dto';
import { emailValidator } from './validators/email.validator';
import { passwordMatchValidator } from './validators/password-match.validator';
@Component({
  selector: 'hwfe-auth-register',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    RouterModule,
    MatButtonModule,
  ],
  templateUrl: './auth-register.component.html',
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthRegisterComponent {
  private formBuilder = inject(FormBuilder);
  private authService = inject(AuthService);
  private dashboardNavService = inject(DashboardNavService);
  private userApiService = inject(UserApiService);

  public formGroup: FormGroup<TypedForm<UserRegisterDto>> = this.formBuilder.group(
    {
      email: this.formBuilder.control('', {
        nonNullable: true,
        asyncValidators: [this.availableEmailValidator()],
        validators: [Validators.required, emailValidator({ allow_display_name: false })],
      }),
      displayName: this.formBuilder.control('', {
        nonNullable: true,
        asyncValidators: [this.availableDisplayNameValidator()],
        validators: [Validators.required],
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

  public availableEmailLoading: WritableSignal<boolean> = signal<boolean>(false);

  public availableDisplayNameLoading: WritableSignal<boolean> = signal<boolean>(false);

  public passwordHidden: WritableSignal<boolean> = signal<boolean>(true);

  public passwordConfirmationHidden: WritableSignal<boolean> = signal<boolean>(true);

  public availableEmailValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      if (!control.value) {
        this.availableEmailLoading.set(false);

        return of(null);
      }

      this.availableEmailLoading.set(true);

      return timer(500).pipe(
        switchMap((): Observable<boolean> => {
          return this.userApiService.availabilityEmail(control.value);
        }),
        map((available: boolean): ValidationErrors | null => {
          return available ? null : { unavailable: true };
        }),
        finalize((): void => {
          this.availableEmailLoading.set(false);
        })
      );
    };
  }

  public availableDisplayNameValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      if (!control.value) {
        this.availableDisplayNameLoading.set(false);

        return of(null);
      }

      this.availableDisplayNameLoading.set(true);

      return timer(500).pipe(
        switchMap((): Observable<boolean> => {
          return this.userApiService.availabilityDisplayName(control.value);
        }),
        map((available: boolean): ValidationErrors | null => {
          return available ? null : { unavailable: true };
        }),
        finalize((): void => {
          this.availableDisplayNameLoading.set(false);
        })
      );
    };
  }

  public passwordHiddenToggle(): void {
    this.passwordHidden.set(!this.passwordHidden());
  }

  public passwordConfirmationHiddenToggle(): void {
    this.passwordConfirmationHidden.set(!this.passwordConfirmationHidden());
  }

  public register(): void {
    this.authService
      .register(this.formGroup.getRawValue())
      .pipe(
        tap((): void => {
          this.dashboardNavService.toUsers();
        })
      )
      .subscribe();
  }
}
