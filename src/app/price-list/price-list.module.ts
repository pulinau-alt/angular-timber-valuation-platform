import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PriceListFormComponent } from './price-list-form/price-list-form.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { MaterialModule } from '../material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    MDBBootstrapModule.forRoot(),
    MaterialModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [PriceListFormComponent],
  exports: [PriceListFormComponent]
})
export class PriceListModule { }
