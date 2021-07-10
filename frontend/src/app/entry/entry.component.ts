import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.scss']
})
export class EntryComponent implements OnInit {

  error = ''
  showErr = false;

  entryForm = this.formBuilder.group({
    chassisNum: ['', Validators.required],
    engineNum: ['', Validators.required],
    bodyCode: ['', Validators.required],
    supplier: ['', Validators.required],
    containerNum: ['', Validators.required],
    unitDesc: ['', Validators.required],
  });

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log(this.entryForm.value);
  }
}
