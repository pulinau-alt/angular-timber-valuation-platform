import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';

import { EmailService } from '../email.service';
import { Router } from '@angular/router';
import { NotificationService } from '../services/notification.service';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  notificationList = [];
  displayedColumns: string[] = ['subject', 'body'];
  dataSource: MatTableDataSource<Notification>;

  constructor(public auth: AuthService, private _emailService: EmailService, private router: Router, private notificationService: NotificationService) { }

  ngOnInit() {
    const data = this.notificationService.getNotifications();
    data.subscribe(notification => {
      this.notificationList = [];
      notification.forEach(t => {
        this.notificationList.push(t);
      });
      this.dataSource = new MatTableDataSource(this.notificationList);
    });
  }

  // email

onSubmit(name, email, comment) {
  // this._emailService.sendEmail({
  //   from: 'Mailgun Sandbox <postmaster@sandboxyourapikeysetXXXXXX.mailgun.org>',
  //   to: email,
  //   name: name,
  //   text: comment,
  // })
  // .subscribe(
  //   () => {},
  //   err => console.log(err)
  // );
} 
//email end

//import
// constructor(
//   private _emailService: EmailService
// ) {}

}

// //import
// import { EmailService } from '../email.service';
// //...... some source code
// //send email in angular 6 source code
// constructor(
//   private _emailService: EmailService
// ) {}
