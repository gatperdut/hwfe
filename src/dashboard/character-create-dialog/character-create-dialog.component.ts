/* eslint-disable @angular-eslint/prefer-inject */
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CharacterClasses } from '../../character-aux/types/character-class.type';
import { TypedForm } from '../../types/typed-form.type';
import { CharacterCreateDto } from './dto/character-create.dto';

export type CharacterCreateDialogData = {
  character: CharacterCreateDto;
};

export type CharacterCreateDialogResult = CharacterCreateDto | undefined;

export const openCharacterCreateDialog = (
  matDialog: MatDialog,
  data: CharacterCreateDialogData
) => {
  return matDialog.open<
    CharacterCreateDialogComponent,
    CharacterCreateDialogData,
    CharacterCreateDialogResult
  >(CharacterCreateDialogComponent, {
    data,
  });
};

@Component({
  selector: 'hwfe-character-create-dialog',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDialogModule,
    MatButtonModule,
  ],
  templateUrl: './character-create-dialog.component.html',
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharacterCreateDialogComponent implements OnInit {
  private formBuilder = inject(FormBuilder);

  public formGroup!: FormGroup<TypedForm<CharacterCreateDto>>;

  public characterClasses = CharacterClasses;

  constructor(
    public matDialogRef: MatDialogRef<CharacterCreateDialogComponent, CharacterCreateDialogResult>,
    @Inject(MAT_DIALOG_DATA) public data: CharacterCreateDialogData
  ) {
    // Empty
  }

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      name: this.formBuilder.control(this.data.character.name, {
        nonNullable: true,
        validators: [Validators.required],
      }),
      class: this.formBuilder.control(this.data.character.class, {
        nonNullable: true,
        validators: [Validators.required],
      }),
    });
  }

  public create(): void {
    this.matDialogRef.close(this.formGroup.value as CharacterCreateDto);
  }
}
