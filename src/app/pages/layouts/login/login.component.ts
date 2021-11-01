import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  email: String = '';
  password: String = '';
  isLoginFail: boolean = false;

  constructor(
    private auth: AuthService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {}

  login(): void {
    this.spinner.show();
    let loginStatus = this.auth.login({
      email: this.email,
      password: this.password,
    });
    loginStatus ? this.router.navigate(['/']) : (this.isLoginFail = true);
    this.spinner.hide();
  }
}
