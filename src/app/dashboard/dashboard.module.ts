import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { NotificationComponent } from './notification/notification.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { SharedModule } from '../shared.module';


@NgModule({
  declarations: [DashboardComponent, NotificationComponent],
  imports: [
    CommonModule,
    SharedModule,
  ],
  exports: [DashboardComponent, NotificationComponent],
})
export class DashboardModule { }
