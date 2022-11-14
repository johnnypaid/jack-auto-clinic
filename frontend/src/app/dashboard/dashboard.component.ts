import { SearchService } from './../service/search.service';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '../service/common.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  headStat: any;
  userForm = false;
  registryForm = false;
  newEntryForm = false;
  entryCards = true;
  entryTbl = false;
  registerTbl = false;
  prodTbl = false;
  prodForm = false;
  searchChasisResult = false;
  searchChasisData: any;
  user: any;
  searchChasis = '';

  constructor(private common: CommonService, private router: Router, private searchData: SearchService) { }

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
        this.searchChasisResult = false;
        this.entryCards = false;
        this.newEntryForm = false;
        this.prodTbl = false;
        this.setLocal(1);
        break;
      }
      case 2: {
        this.userForm = false;
        this.searchChasisResult = false;
        this.entryCards = false;
        this.newEntryForm = true;
        this.registerTbl = false;
        this.prodForm = false;
        this.prodTbl = false;
        this.setLocal(2);
        break;
      }
      case 3: {
        this.userForm = false;
        this.searchChasisResult = false;
        this.entryCards = false;
        this.registerTbl = false;
        this.registryForm = true;
        this.prodForm = false;
        this.prodTbl = false;
        this.setLocal(3);
        break;
      }
      case 4: {
        this.prodForm = true;
        this.searchChasisResult = false;
        this.userForm = false;
        this.entryCards = false;
        this.registerTbl = false;
        this.prodTbl = false;
        this.setLocal(4);
        break;
      }
      case 5: {
        this.entryTbl = true;
        this.searchChasisResult = false;
        this.prodTbl = false;
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
        console.log(evt);
        this.registerTbl = true;
        this.searchChasisResult = false;
        this.prodTbl = false;
        this.entryTbl = false;
        this.entryCards = false;
        this.newEntryForm = false;
        this.userForm = false;
        this.registryForm = false;
        this.prodForm = false;
        this.setLocal(6);
        break;
      }
      case 7: {
        this.prodTbl = true;
        this.searchChasisResult = false;
        this.prodForm = false;
        this.registerTbl = false;
        this.entryTbl = false;
        this.entryCards = false;
        this.newEntryForm = false;
        this.userForm = false;
        this.registryForm = false;
        this.setLocal(7);
        break;
      }
      default: {
        this.prodTbl = false;
        this.searchChasisResult = false;
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
    console.log(localStorage.getItem('current'))
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('current');
    localStorage.removeItem('user');
    console.log(localStorage.removeItem('token'));
    this.router.navigate(['']);
  }

  search(keyword: any) {
    this.searchChasisResult = false;
    if (keyword) {
      this.searchData.searchChasis({chasis: keyword, token: localStorage.getItem('token')})
      .subscribe(resdata => {
        console.log(resdata);
          this.searchChasisData = resdata.body;
          this.searchData.setSearchData(this.searchChasisData);
          this.searchChasisResult = true;
          this.registerTbl = false;
          this.prodTbl = false;
          this.entryTbl = false;
          this.entryCards = false;
          this.newEntryForm = false;
          this.userForm = false;
          this.registryForm = false;
          this.prodForm = false;
      }, error => {
        console.log(error.error);
      });
    }
  }

  ngOnDestroy() {
    localStorage.removeItem('current');
  }
}
