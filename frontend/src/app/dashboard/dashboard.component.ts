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
  newEntryForm = false;
  entryCards = true;

  user: any;

  constructor(private common: CommonService, private router: Router) { }

  ngOnInit(): void {
    
    if (localStorage.getItem('token') === undefined || localStorage.getItem('token') === null) {
      this.router.navigate(['/']);
    }

    this.getUser();
    this.entryCards = true;
  }

  getUser() {
     console.log(this.common.getUserData());
  }

  getNotification(evt: any) {
    switch (evt) {
      case 1: {
        this.userForm = true;
        this.entryCards = false;
        this.newEntryForm = false;
        break;
      }
      case 2: {
        console.log(evt);
        this.userForm = false;
        this.entryCards = false;
        this.newEntryForm = true;
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
