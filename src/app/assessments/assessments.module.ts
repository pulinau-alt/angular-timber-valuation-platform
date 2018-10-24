import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubmissionFormComponent } from './submission-form/submission-form.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { MaterialModule } from '../material.module';

@NgModule({
  imports: [
    CommonModule,
    MDBBootstrapModule.forRoot(),
    MaterialModule,
  ],
  declarations: [SubmissionFormComponent],
  exports: [SubmissionFormComponent]
})
export class AssessmentsModule { }
