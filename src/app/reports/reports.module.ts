import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenerateReportComponent } from './generate-report/generate-report.component';
import { ReportsComponent } from './reports.component';
import { SharedModule } from '../shared.module';
import { ViewReportComponent, SaveDialogComponent } from './view-report/view-report.component';

@NgModule({
  declarations: [
    GenerateReportComponent,
    ReportsComponent,
    ViewReportComponent,
    SaveDialogComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
  ],
  entryComponents: [SaveDialogComponent],
  exports: [GenerateReportComponent, ReportsComponent, ViewReportComponent],
})
export class ReportsModule { }
