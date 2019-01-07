import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';

import { EmailService } from '../email.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(public auth: AuthService, private _emailService: EmailService) { }

  ngOnInit() {
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
