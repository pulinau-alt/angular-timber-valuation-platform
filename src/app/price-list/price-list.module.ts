import { SharedModule } from './../shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PriceListFormComponent } from './price-list-form/price-list-form.component';
import { PriceListViewComponent } from './price-list-view/price-list-view.component';
import {MAT_DIALOG_DEFAULT_OPTIONS} from '@angular/material';
import {MatDialogModule} from '@angular/material/dialog';
import { Classification } from './price-list-view/price-list-view.component';

@NgModule({
  imports: [
    CommonModule,
    MDBBootstrapModule.forRoot(),
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,
    SharedModule,
  ],
  declarations: [PriceListFormComponent, PriceListViewComponent, Classification ],
  providers: [{provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}}],
  exports: [PriceListFormComponent, PriceListViewComponent, Classification],
  entryComponents: [Classification],
  bootstrap: [PriceListViewComponent]
})
export class PriceListModule { }
