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
import { catchError, delay, map, Observable, of, switchMap, tap, timer } from 'rxjs';
import { NavService } from '../../services/nav.service';
import { TypedForm } from '../../types/typed-form.type';
import { UserApiService } from '../../user/services/user-api.service';
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
    MatIconModule,
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
  private navService: NavService = inject(NavService);
  private userApiService: UserApiService = inject(UserApiService);

  public formGroup: FormGroup<TypedForm<UserRegisterDto>> = this.formBuilder.group(
    {
      email: this.formBuilder.control('', {
        nonNullable: true,
        asyncValidators: [this.availableEmailValidator()],
        validators: [Validators.required, Validators.email],
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

  public availableEmailValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      if (!control.value) {
        this.availableEmailLoading.set(false);

        return of(null);
      }

      return timer(500).pipe(
        tap((): void => {
          this.availableEmailLoading.set(true);
        }),
        switchMap((): Observable<boolean> => {
          return this.userApiService.availableEmail(control.value).pipe(delay(1000));
        }),
        tap((): void => {
          this.availableEmailLoading.set(false);
        }),
        map((available: boolean): ValidationErrors | null => {
          return available ? null : { unavailable: true };
        }),
        catchError((): Observable<null> => {
          this.availableEmailLoading.set(false);

          return of(null);
        })
      );
    };
  }

  public availableDisplayNameValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      if (!control.value) {
        this.availableEmailLoading.set(false);

        return of(null);
      }

      return timer(500).pipe(
        tap((): void => {
          this.availableEmailLoading.set(true);
        }),
        switchMap((): Observable<boolean> => {
          return this.userApiService.availableDisplayName(control.value);
        }),
        tap((): void => {
          this.availableEmailLoading.set(false);
        }),
        map((available: boolean): ValidationErrors | null => {
          return available ? null : { unavailable: true };
        }),
        catchError((): Observable<null> => {
          this.availableEmailLoading.set(false);

          return of(null);
        })
      );
    };
  }

  public passwordHidden: WritableSignal<boolean> = signal<boolean>(true);

  public passwordConfirmationHidden: WritableSignal<boolean> = signal<boolean>(true);

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
          this.navService.dashMain();
        })
      )
      .subscribe((result): void => {
        console.log(result);
      });
  }
}
