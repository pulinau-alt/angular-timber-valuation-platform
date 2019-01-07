import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenerateReportComponent } from './generate-report/generate-report.component';
import { ReportsComponent } from './reports.component';
import { SharedModule } from '../shared.module';

@NgModule({
  declarations: [GenerateReportComponent, ReportsComponent],
  imports: [
    CommonModule,
    SharedModule,
  ],
  exports: [GenerateReportComponent, ReportsComponent],
})
export class ReportsModule { }
