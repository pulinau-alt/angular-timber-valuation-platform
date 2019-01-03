import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './core/auth.guard';
import { LoginComponent } from './login-register/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { SubmissionFormComponent } from './assessments/submission-form/submission-form.component';
import { ViewComponent } from './assessments/view/view.component';
import { PlotsComponent } from './plots/plots.component';
import { CreatePlotComponent } from './create-plot/create-plot.component';
import { ViewPlotComponent } from './view-plot/view-plot.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'assessment/submit',
    component: SubmissionFormComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'assessment/view',
    component: ViewComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'plots',
    component: PlotsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'plots/create',
    component: CreatePlotComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'plots/view',
    component: ViewPlotComponent,
    canActivate: [AuthGuard]
  },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
