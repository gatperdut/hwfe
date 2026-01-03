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
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { debounceTime, map, Observable, shareReplay, startWith, switchMap } from 'rxjs';
import { Paginated } from '../../types/paginated.type';
import { UserAllDto } from '../dto/user-all.dto';
import { UserApiService } from '../services/user-api.service';
import { User } from '../types/user.type';

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

  public userIdFormControl: InputSignal<FormControl<number | undefined>> =
    input.required<FormControl<number | undefined>>();

  public withoutIds: InputSignal<number[] | undefined> = input<number[] | undefined>();

  public users$: Observable<User[]>;

  public termControl: FormControl<UserAllDto['term']> = this.formBuilder.control('', {
    nonNullable: true,
    validators: [],
  });

  constructor() {
    this.users$ = this.termControl.valueChanges
      .pipe(startWith(this.termControl.value), debounceTime(500))
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        switchMap(
          (): Observable<Paginated<User>> =>
            this.userApiService.all({
              ...{ page: 0, pageSize: 15 },
              ...{ 'withoutIds[]': this.withoutIds() },
              ...{ term: this.termControl.value },
            })
        ),
        map((response: Paginated<User>): User[] => {
          return response.items;
        }),
        shareReplay()
      );
  }

  public selectionChanged(user: User | null): void {
    this.userIdFormControl().setValue(user?.id);
  }

  public selectionCleared(userSelect: MatSelect): void {
    userSelect.value = null;

    this.selectionChanged(null);
  }
}
