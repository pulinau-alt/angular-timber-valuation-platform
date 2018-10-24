import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { UserProfileComponent } from './user-profile/user-profile.component';
import { SubmissionFormComponent } from './assessments/submission-form/submission-form.component';

const routes: Routes = [
  { path: '',                                component: UserProfileComponent },
  { path: 'assessment/submit',               component: SubmissionFormComponent },
]

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
