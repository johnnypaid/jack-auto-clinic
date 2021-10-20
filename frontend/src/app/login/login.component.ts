import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from '../service/common.service';
import { LoginService } from '../service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  userData: any;
  loginError = '';

  loginForm = this.formBuilder.group({
    email: '',
    password: ''
  });

  constructor(
    private loginService: LoginService,
    private formBuilder: FormBuilder,
    private common: CommonService,
    private router: Router) { }

  ngOnInit(): void {}

  onSubmit(): void {
    this.loginError = '';
    this.loginService.getUser(this.loginForm)
      .subscribe(resdata => {
        this.userData = resdata;
        const passport = this.userData.headers.get('x-auth-token');
        localStorage.setItem('token', passport);
        if (this.userData.status === 200) {
          this.common.setUserData(this.userData.body);
          this.router.navigate(['/dashboard']);
        } 
      }, error => {
        this.loginError = error.error;
      });
  }
}
function token(token: any, passport: any) {
  throw new Error('Function not implemented.');
}

