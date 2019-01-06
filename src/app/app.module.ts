import { AuthGuard } from './core/auth.guard';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire';

import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { ComponentsModule } from './components/components.module';
import { AppRoutingModule } from './app-routing.module';
import { LoginRegisterModule } from './login-register/login-register.module';
import { CoreModule } from './core/core.module';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AssessmentsModule } from './assessments/assessments.module';
import { MaterialModule } from './material.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { NotificationComponent } from './dashboard/notification/notification.component';
import { EmailService } from './email.service';

import { HttpModule } from '@angular/http';
// ...
//   imports: [
//     BrowserModule,
//     HttpModule,
//     IonicModule.forRoot(MyApp),
//     IonicStorageModule.forRoot()
//   ]


@NgModule({
  declarations: [
    AppComponent,
    UserProfileComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    AngularFireModule.initializeApp(environment.firebase),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    ComponentsModule,
    AppRoutingModule,
    LoginRegisterModule,
    CoreModule,
    AssessmentsModule,
    DashboardModule,
    HttpModule,
  ],
  providers: [AuthGuard, EmailService],
  bootstrap: [AppComponent]
})
export class AppModule { }

// email
//set the ...
// providers: [
//   EmailService
// ]
// ...