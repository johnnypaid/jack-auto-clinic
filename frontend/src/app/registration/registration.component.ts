import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { PromptMessageService } from '../service/prompt-message.service';
import { RegistrationService } from '../service/registration.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  showErr = false;
  error = '';
  passport: any;

  registrationForm = this.formBuilder.group({
    date: ['', Validators.required],
    name: ['', Validators.required],
    chassisNum: ['', Validators.required],
    engineNum: ['', Validators.required],
    plateNum: ['', Validators.required],
    mvNum: ['', Validators.required],
    bodyType: ['', Validators.required],
    color: ['', Validators.required],
  });

  constructor(private formBuilder: FormBuilder, private regService: RegistrationService, private message: PromptMessageService) { }

  ngOnInit(): void {
    this.passport = localStorage.getItem('token');
  }

  onSubmit() {
    console.log(this.registrationForm.value);
    if (this.registrationForm.valid === true) {
      try {
        const year = this.registrationForm.value.date.year;
        let month = this.registrationForm.value.date.month;
        let day = this.registrationForm.value.date.day;
        let newdate = '';

        if (year !== undefined || month !== undefined || day !== undefined) {
          if (month < 10) {
            month = '0' + month;
          }
          if (day < 10) {
            day = '0' + day;
          }
        }

        newdate = year + '-' + month + '-' + day;

        this.registrationForm.value.date = newdate;
        console.log(this.registrationForm.value);

        this.error = '';
        this.showErr = false;
        this.regService.newRegistration(this.registrationForm.value, this.passport)
         .subscribe(resdata => {
            console.log(resdata);
            this.showErr = false;
            this.message.setMessage('User added succesfully.');
            this.registrationForm.reset();
         }, error => {
            this.error = error.error;
            this.showErr = true;
         });
      } catch (error) {
        this.error = error;
        this.showErr = true;
      }
    } else {
      this.error = 'Please complete details.';
      this.showErr = true;
    }
  }

}
