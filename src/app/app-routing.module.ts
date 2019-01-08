import { ManagerGuard } from './core/guards/manager.guard';
import { AdminGuard } from './core/guards/admin.guard';
import { AdminPanelComponent } from './admin/admin-panel/admin-panel.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './core/guards/auth.guard';
import { LoginComponent } from './login-register/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { SubmissionFormComponent } from './assessments/submission-form/submission-form.component';
import { ViewComponent } from './assessments/view/view.component';
import { NotificationComponent } from './dashboard/notification/notification.component';
import { PriceListViewComponent } from './price-list/price-list-view/price-list-view.component';
import { PriceListFormComponent } from './price-list/price-list-form/price-list-form.component';
import { DevOfficerGuard } from './core/guards/dev-officer.guard';
import { CreationFormComponent } from './plots/creation-form/creation-form.component';
import { PlotsViewComponent } from './plots/plots-view/plots-view.component';
import { ReportsComponent } from './reports/reports.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'home',
    data: {
      breadcrumb: 'dashboard'
    },
    children: [
      {
        path: '',
        component: DashboardComponent
      },
      {
        path: 'notify',
        component: NotificationComponent,
        data: {
          breadcrumb: 'notify'
        },
      },
    ],
    canActivate: [AuthGuard]
  },
  {
    path: 'assessments',
    data: { breadcrumb: 'assessments' },
    children: [
      { path: '', component: ViewComponent },
      {
        path: 'form',
        component: SubmissionFormComponent,
        data: { breadcrumb: 'form' },
        canActivate: [DevOfficerGuard]
      },
    ],
    canActivate: [AuthGuard]
  },
  {
    path: 'pricelist',
    data: { breadcrumb: 'pricelist' },
    children: [
      { path: '', component: PriceListViewComponent, },
      {
        path: 'form',
        component: PriceListFormComponent,
        data: { breadcrumb: 'form' },
        canActivate: [ManagerGuard]
      }
    ],
    canActivate: [AuthGuard]
  },
  {
    path: 'users/manage',
    data: { breadcrumb: 'manage users' },
    component: AdminPanelComponent,
    canActivate: [AuthGuard, AdminGuard]
  },
  {
    path: 'plots',
    data: { breadcrumb: 'plots' },
    children: [
      {
        path: '',
        component: PlotsViewComponent,
      },
      {
        path: 'form',
        component: CreationFormComponent,
        data: { breadcrumb: 'form' },
      }
    ]
  },
  {
    path: 'reports',
    component: ReportsComponent,
    data: { breadcrumb: 'reports' },
    children: [],
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
