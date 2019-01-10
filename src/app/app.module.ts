import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { AngularFireModule } from '@angular/fire';
import { EmailService } from './email.service';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { ComponentsModule } from './components/components.module';
import { AppRoutingModule } from './app-routing.module';
import { LoginRegisterModule } from './login-register/login-register.module';
import { CoreModule } from './core/core.module';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AssessmentsModule } from './assessments/assessments.module';
import { MaterialModule } from './material.module';
import { PriceListModule } from './price-list/price-list.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { SharedModule } from './shared.module';
import { DevOfficerGuard } from './core/guards/dev-officer.guard';
import { ReportsModule } from './reports/reports.module';
import { PlotsModule } from './plots/plots.module';
import { FieldOfficerGuard } from './core/guards/field-officer.guard';
import { ManagerGuard } from './core/guards/manager.guard';
import { AdminGuard } from './core/guards/admin.guard';
import { AdminModule } from './admin/admin.module';
import { AuthGuard } from './core/guards/auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    UserProfileComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    SharedModule,
    AngularFireModule.initializeApp(environment.firebase),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    ComponentsModule,
    AppRoutingModule,
    LoginRegisterModule,
    CoreModule,
    AssessmentsModule,
    PriceListModule,
    DashboardModule,
    AdminModule,
    PlotsModule,
    HttpModule,
    ReportsModule,
  ],
  providers: [
    Title,
    { provide: LOCALE_ID, useValue: 'en-SL' },
    AuthGuard,
    AdminGuard,
    DevOfficerGuard,
    ManagerGuard,
    FieldOfficerGuard,
    EmailService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
