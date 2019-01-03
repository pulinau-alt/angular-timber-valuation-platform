import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './core/auth.guard';
import { LoginComponent } from './login-register/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { SubmissionFormComponent } from './assessments/submission-form/submission-form.component';
import { ViewComponent } from './assessments/view/view.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'home',
    component: DashboardComponent,
    data: {
      breadcrumb: 'dashboard'
    },
    canActivate: [AuthGuard]
  },
  {
    path: 'assessments',
    data: {
      breadcrumb: 'assessments'
    },
    children: [
      {
        path: '',
        component: ViewComponent
      },
      {
        path: 'submit',
        component: SubmissionFormComponent,
        data: {
          breadcrumb: 'submit'
        }
      },
    ],
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
