import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PriceListFormComponent } from './price-list-form/price-list-form.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { MaterialModule } from '../material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PriceListViewComponent } from './price-list-view/price-list-view.component';

@NgModule({
  imports: [
    CommonModule,
    MDBBootstrapModule.forRoot(),
    MaterialModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [PriceListFormComponent, PriceListViewComponent],
  exports: [PriceListFormComponent, PriceListViewComponent]
})
export class PriceListModule { }
