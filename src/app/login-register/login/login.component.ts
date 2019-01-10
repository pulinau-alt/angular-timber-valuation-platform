import { AuthService } from './../../core/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private fb: FormBuilder, private auth: AuthService, private route: Router) {
  }

  ngOnInit() {
    if (this.auth.isAuthenticated()) { this.route.navigate(['']); }
  }

  public googleLogin() {
    this.auth.googleLogin();
    this.auth.user$.subscribe(user => console.log(user.roles));
  }

}
