import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  input,
  InputSignal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import {
  combineLatest,
  debounceTime,
  map,
  Observable,
  shareReplay,
  startWith,
  switchMap,
} from 'rxjs';
import { Paginated } from '../../types/paginated.type';
import { TypedForm } from '../../types/typed-form.type';
import { UserApiService } from '../services/user-api.service';
import { User } from '../types/user.type';
import { UserPickerDto } from './dto/user-picker.dto';

@Component({
  selector: 'hwfe-user-picker',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule,
    NgxMatSelectSearchModule,
    MatButtonModule,
  ],
  templateUrl: './user-picker.component.html',
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserPickerComponent {
  private userApiService = inject(UserApiService);
  private formBuilder = inject(FormBuilder);
  private destroyRef: DestroyRef = inject(DestroyRef);

  public withoutIds: InputSignal<number[] | undefined> = input<number[] | undefined>();

  public users$: Observable<User[]>;

  public formGroup: FormGroup<TypedForm<UserPickerDto>> = this.formBuilder.group({
    term: this.formBuilder.control('', {
      nonNullable: true,
      validators: [],
    }),
  });

  constructor() {
    this.users$ = combineLatest([
      this.formGroup.valueChanges.pipe(startWith(this.formGroup.value), debounceTime(500)),
    ]).pipe(
      takeUntilDestroyed(this.destroyRef),
      switchMap(
        (): Observable<Paginated<User>> =>
          this.userApiService.all({
            ...{ page: 0, pageSize: 15 },
            ...{ 'withoutIds[]': this.withoutIds() },
            ...this.formGroup.value,
          })
      ),
      map((response: Paginated<User>): User[] => {
        return response.items;
      }),
      shareReplay()
    );
  }

  public selectionChanged(user: User | null): void {
    console.log(user);
  }

  public selectionCleared(userSelect: MatSelect): void {
    userSelect.value = null;

    this.selectionChanged(null);
  }
}
