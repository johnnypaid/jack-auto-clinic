import { NewEntryService } from './../service/new-entry.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { PromptMessageService } from '../service/prompt-message.service';

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.scss']
})
export class EntryComponent implements OnInit, OnDestroy {

  error = ''
  showErr = false;
  passport: any;
  submit = false;
  isSelected = true;

  entryForm = this.formBuilder.group({
    chassisNum: ['', Validators.required],
    engineNum: ['', Validators.required],
    bodyCode: ['', Validators.required],
    supplier: ['', Validators.required],
    containerNum: ['', Validators.required],
    unitDesc: [''],
  });


  constructor(
    private formBuilder: FormBuilder,
    private newEntry: NewEntryService,
    private message: PromptMessageService) { }

  ngOnInit(): void {
    this.passport = localStorage.getItem('token');

    this.newEntry.getAllEntry(this.passport)
    .subscribe(resdata => {
      console.log(resdata);
    })
  }

  onSubmit() {
    console.log(this.entryForm.value);
    if (this.entryForm.valid === true) {
      console.log(this.entryForm.valid);
       try {
        this.newEntry.newEntry(this.entryForm.value, this.passport)
        .subscribe(resdata => {
          console.log(resdata);
          this.showErr = false;
          this.message.setMessage('Entry added succesfully.');
          this.entryForm.reset();
        }, error => {
          this.error = error.error;
          console.log(error);
          this.showErr = true;
        })
       } catch (error) {
        this.error = error;
        this.showErr = true;
       }
    } else {
      this.error = 'Please complete details.';
      this.showErr = true;
    }
  }

  ngOnDestroy() {
    localStorage.removeItem('current');
  }
}
