import { SharedModule } from './../shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PriceListFormComponent } from './price-list-form/price-list-form.component';
import { PriceListViewComponent } from './price-list-view/price-list-view.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
  ],
  declarations: [PriceListFormComponent, PriceListViewComponent],
  exports: [PriceListFormComponent, PriceListViewComponent]
})
export class PriceListModule { }
