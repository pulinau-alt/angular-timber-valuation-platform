import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubmissionFormComponent } from './submission-form/submission-form.component';
import { ViewComponent } from './view/view.component';
import { SharedModule } from '../shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
  ],
  declarations: [SubmissionFormComponent, ViewComponent],
  exports: [SubmissionFormComponent, ViewComponent]
})
export class AssessmentsModule { }
