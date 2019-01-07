import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PlotsViewComponent } from './plots-view/plots-view.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreationFormComponent } from './creation-form/creation-form.component';
import { MaterialModule } from '../material.module';
import { MatExpansionModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    FormsModule,
    MatExpansionModule
  ],
  declarations: [
    CreationFormComponent,
    PlotsViewComponent
  ],
  exports: [
    CreationFormComponent,
    PlotsViewComponent
  ]
})
export class PlotsModule { }
