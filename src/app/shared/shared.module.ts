import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchBoxComponent } from './search-box/search-box.component';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { UppercaseDirective } from './directives/uppercase.directive';

@NgModule({
  declarations: [
    SearchBoxComponent,
    ConfirmDialogComponent,
    UppercaseDirective,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
  exports: [
    SearchBoxComponent,
    ConfirmDialogComponent,
    UppercaseDirective,
  ]
})
export class SharedModule { }
