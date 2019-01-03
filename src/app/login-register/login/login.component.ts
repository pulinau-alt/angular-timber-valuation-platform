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

  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private auth: AuthService, private route: Router) {
    this.initForm();
  }

  private googleLogin() {
    this.auth.googleLogin();
  }

  ngOnInit() {
    if (this.auth.isAuthenticated()) { this.route.navigate(['']); }
  }

  private initForm() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

}
