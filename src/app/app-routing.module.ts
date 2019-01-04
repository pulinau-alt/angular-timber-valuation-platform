import { PlotsViewComponent } from './plots/plots-view/plots-view.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { SubmissionFormComponent } from './assessments/submission-form/submission-form.component';
import { ViewComponent } from './assessments/view/view.component';
import { CreationFormComponent } from './plots/creation-form/creation-form.component';

const routes: Routes = [
  { path: '',                                component: UserProfileComponent },
  { path: 'assessment/submit',               component: SubmissionFormComponent },
  { path: 'assessment/view',                 component: ViewComponent },
  { path: 'plots/new',                       component: CreationFormComponent},
  { path: 'plots/view',                      component: PlotsViewComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
