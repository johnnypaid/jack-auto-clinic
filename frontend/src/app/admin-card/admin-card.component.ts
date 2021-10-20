import { CommonService } from './../service/common.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-admin-card',
  templateUrl: './admin-card.component.html',
  styleUrls: ['./admin-card.component.scss']
})
export class AdminCardComponent implements OnInit {

  userData: any;
  userInfo: any;
  isAdmin = false;

  @Output() notifyParent: EventEmitter<any> = new EventEmitter();

  constructor(private common: CommonService) { }

  ngOnInit(): void {
    this.userData = localStorage.getItem('user');
    this.userInfo = JSON.parse(this.userData);
    this.isAdmin = this.userInfo.isAdmin;
    console.log(this.userInfo.isAdmin);
  }
  sendNotification(value: any) {
    this.notifyParent.emit(value);
  }
}
