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
import { TypedForm } from '../../types/typed-form.type';
import { CampaignCreate } from '../dto/campaign-create.dto';

export type CampaignCreateDialogData = {
  campaign: CampaignCreate;
};

export type CampaignCreateDialogResult = CampaignCreate | undefined;

export const openCampaignCreateDialog = (matDialog: MatDialog, data: CampaignCreateDialogData) => {
  return matDialog.open<
    CampaignCreateDialogComponent,
    CampaignCreateDialogData,
    CampaignCreateDialogResult
  >(CampaignCreateDialogComponent, {
    data,
  });
};

@Component({
  selector: 'hwfe-campaign-create-dialog',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDialogModule,
    MatButtonModule,
  ],
  templateUrl: './campaign-create-dialog.component.html',
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CampaignCreateDialogComponent implements OnInit {
  private formBuilder = inject(FormBuilder);

  public formGroup!: FormGroup<TypedForm<CampaignCreate>>;

  constructor(
    public matDialogRef: MatDialogRef<CampaignCreateDialogComponent, CampaignCreateDialogResult>,
    @Inject(MAT_DIALOG_DATA) public data: CampaignCreateDialogData
  ) {
    // Empty
  }

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      name: this.formBuilder.control(this.data.campaign.name, {
        nonNullable: true,
        validators: [Validators.required],
      }),
    });
  }

  public create(): void {
    this.matDialogRef.close(this.formGroup.value as CampaignCreate);
  }
}
