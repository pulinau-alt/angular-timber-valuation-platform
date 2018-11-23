import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubmissionFormComponent } from './submission-form/submission-form.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { MaterialModule } from '../material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ViewComponent } from './view/view.component';

@NgModule({
  imports: [
    CommonModule,
    MDBBootstrapModule.forRoot(),
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  declarations: [SubmissionFormComponent, ViewComponent],
  exports: [SubmissionFormComponent, ViewComponent]
})
export class AssessmentsModule { }
