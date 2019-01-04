import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PlotsViewComponent } from './plots-view/plots-view.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreationFormComponent } from './creation-form/creation-form.component';
import { MaterialModule } from '../material.module';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    MDBBootstrapModule.forRoot(),
    FormsModule
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
