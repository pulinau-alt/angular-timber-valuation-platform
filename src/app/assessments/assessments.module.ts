import { AppRoutingModule } from './../app-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubmissionFormComponent } from './submission-form/submission-form.component';
import { MaterialModule } from '../material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ViewComponent } from './view/view.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
  ],
  declarations: [SubmissionFormComponent, ViewComponent],
  exports: [SubmissionFormComponent, ViewComponent]
})
export class AssessmentsModule { }
