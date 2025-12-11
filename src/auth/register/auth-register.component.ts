import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TypedForm } from '../../types/typed-form.type';
import { UserRegister } from '../types/user-register.type';

@Component({
  selector: 'hwfe-auth-register',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './auth-register.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthRegisterComponent {
  private formBuilder: FormBuilder = inject(FormBuilder);

  public formGroup: FormGroup<TypedForm<UserRegister>> = this.formBuilder.group({
    displayName: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  public register(): void {
    // TODO
  }
}
