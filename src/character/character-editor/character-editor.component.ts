import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { PaginationService } from '../../services/pagination.service';
import { TypedForm } from '../../types/typed-form.type';
import { CharacterApiService } from '../services/character-api.service';
import { CharacterClass } from '../types/character-class.type';
import { Character } from '../types/character.type';
import { CharacterEditor } from './dto/character-editor.dto';

@Component({
  selector: 'hwfe-character-editor',
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './character-editor.component.html',
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [PaginationService],
})
export class CharacterEditorComponent implements OnInit {
  public character = input.required<Character>();

  private characterApiService: CharacterApiService = inject(CharacterApiService);
  private formBuilder: FormBuilder = inject(FormBuilder);

  public formGroup!: FormGroup<TypedForm<CharacterEditor>>;

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      name: this.formBuilder.control(this.character().name, {
        nonNullable: true,
        validators: [],
      }),
      class: this.formBuilder.control(this.character().class as CharacterClass, {
        nonNullable: true,
      }),
    });
  }
}
