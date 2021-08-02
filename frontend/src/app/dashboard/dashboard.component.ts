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
  entryTbl = false;
  registerTbl = false;
  prodForm = false;

  user: any;

  constructor(private common: CommonService, private router: Router) { }

  ngOnInit(): void {
    if (localStorage.getItem('token') === undefined || localStorage.getItem('token') === null) {
      this.router.navigate(['/']);
    }

    const current = JSON.parse(localStorage.getItem('current') || '{}');

    this.getNotification(parseInt(current));
    this.getUser();
  }

  getUser() {
     console.log(this.common.getUserData());
  }

  getNotification(evt: any) {
    switch (parseInt(evt)) {
      case 1: {
        this.userForm = true;
        this.entryCards = false;
        this.newEntryForm = false;
        this.setLocal(1);
        break;
      }
      case 2: {
        this.userForm = false;
        this.entryCards = false;
        this.newEntryForm = true;
        this.registerTbl = false;
        this.prodForm = false;
        this.setLocal(2);
        break;
      }
      case 3: {
        this.userForm = false;
        this.entryCards = false;
        this.registerTbl = false;
        this.registryForm = true;
        this.prodForm = false;
        this.setLocal(3);
        break;
      }
      case 4: {
        console.log(evt);
        this.prodForm = true;
        this.userForm = false;
        this.entryCards = false;
        this.registerTbl = false;
        this.setLocal(4);
        break;
      }
      case 5: {
        this.entryTbl = true;
        this.registerTbl = false;
        this.entryCards = false;
        this.newEntryForm = false;
        this.userForm = false;
        this.registryForm = false;
        this.prodForm = false;
        this.setLocal(5);
        break;
      }
      case 6: {
        this.registerTbl = true;
        this.entryTbl = false;
        this.entryCards = false;
        this.newEntryForm = false;
        this.userForm = false;
        this.registryForm = false;
        this.prodForm = false;
        this.setLocal(6);
        break;
      }
      // case 7: {
      //   this.prodForm = true;
      //   this.registerTbl = false;
      //   this.entryTbl = false;
      //   this.entryCards = false;
      //   this.newEntryForm = false;
      //   this.userForm = false;
      //   this.registryForm = false;
      //   this.setLocal(7);
      //   break;
      // }
      default: {
        this.newEntryForm = false;
        this.registerTbl = false;
        this.userForm = false;
        this.entryTbl = false;
        this.registryForm = false;
        this.prodForm = false;
        this.entryCards = true;
        this.setLocal(0);
        break;
      }
    }
  }

  setLocal(num: any) {
    localStorage.setItem('current', num);
  }
}
