import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '../service/common.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  headStat: any;
  userForm = false;
  registryForm = false;
  entryCards = true;

  constructor(private headerStatus: CommonService, private router: Router) { }

  ngOnInit(): void {
    this.getHeader();
    this.entryCards = true;
  }

  getHeader() {
    console.log(this.headerStatus.getHeaderStatus());
    this.headStat = this.headerStatus.getHeaderStatus();
    if (this.headStat === undefined) {
      this.router.navigate(['']);
    }
  }

  getNotification(evt: any) {
    switch (evt) {
      case 1: {
        this.userForm = true;
        this.entryCards = false;
        break;
      }
      case 2: {
        console.log(evt);
        this.userForm = false;
        this.entryCards = false;
        break;
      }
      case 3: {
        console.log(evt);
        this.userForm = false;
        this.entryCards = false;
        break;
      }
      case 4: {
        console.log(evt);
        this.userForm = false;
        this.entryCards = false;
        break;
      }
      default: {
        this.userForm = false;
        this.entryCards = true;
        break;
      }
    }
  }
}
