import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './core/auth.guard';
import { LoginComponent } from './login-register/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { SubmissionFormComponent } from './assessments/submission-form/submission-form.component';
import { ViewComponent } from './assessments/view/view.component';
import { NotificationComponent } from './dashboard/notification/notification.component';
import { PriceListViewComponent } from './price-list/price-list-view/price-list-view.component';
import { PriceListFormComponent } from './price-list/price-list-form/price-list-form.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { 
    path: 'home/notify', 
    component: NotificationComponent,
    data: {
      breadcrumb: 'dashboard  /  notify'
    }, 
  },
  
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
    data: { breadcrumb: 'assessments' },
    children: [
      { path: '', component: ViewComponent },
      {
        path: 'form', component: SubmissionFormComponent, data: { breadcrumb: 'form' }
      },
    ],
    canActivate: [AuthGuard]
  },
  {
    path: 'pricelist',
    data: { breadcrumb: 'pricelist' },
    children: [
      { path: '', component: PriceListViewComponent, },
      { path: 'form', component: PriceListFormComponent, data: { breadcrumb: 'form' } }
    ],
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
