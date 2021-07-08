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

  loginForm = this.formBuilder.group({
    email: '',
    password: ''
  });

  constructor(
    private loginService: LoginService,
    private formBuilder: FormBuilder,
    private responseStatus: CommonService,
    private router: Router) { }

  ngOnInit(): void {

  }

  onSubmit(): void {
    this.loginService.getUser(this.loginForm)
      .subscribe(resdata => {
        this.userData = resdata;
        const passport = this.userData.headers.get('x-auth-token');
        console.log(passport);
        localStorage.setItem('teryo', passport);
        if (this.userData.status === 200) {
          this.responseStatus.setHeaderStatus(this.userData);
          this.router.navigate(['/dashboard']);
        }
      });
  }
}
