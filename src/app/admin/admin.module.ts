import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { SharedModule } from '../shared.module';

@NgModule({
  declarations: [AdminPanelComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [AdminPanelComponent]
})
export class AdminModule { }
