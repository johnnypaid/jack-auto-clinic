import { CommonService } from './../service/common.service';
import { UserService } from './../service/user.service';
import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { PromptMessageService } from '../service/prompt-message.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  userForm = this.formBuilder.group({
    name: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
    isAdmin: ['', Validators.required]
  });

  passport: any;
  error = '';
  success = '';
  showErr = false;
  showSuccess = false;
  resData: any;
  resStatus = 0;

  constructor(
    private formBuilder: FormBuilder, 
    private userService: UserService, 
    private common: CommonService,
    private message: PromptMessageService,
    private element: ElementRef) { }

  ngOnInit(): void { 
    this.showErr = false;
    this.showSuccess = false;
    this.passport = localStorage.getItem('token');
  }

  onSubmit() {
    this.showErr = false;
    this.showSuccess = false;
    console.log(this.userForm.value);
    if (this.userForm.status === 'VALID') {
      this.userService.createUser(this.userForm.value, this.passport)
        .subscribe(resdata => {
          this.showErr = false;
          this.resData = resdata;
          this.message.setMessage('User added succesfully.');
          this.userForm.reset();
        }, error => {
          if (error) {
            this.error = error.error;
            this.showErr = true;
          }
        });
    } else {
      this.error = 'Please fillup user details.';
      this.showErr = true;
    }
  }
}
