import { Component, OnInit } from '@angular/core';
import { CommonService } from './service/common.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  title = 'frontend';
  respStatus: any;

  constructor(private headerStatus: CommonService) {}

  ngOnInit() {
    // this.getResponseStat();
  }

  // getResponseStat() {
  //   this.respStatus = this.headerStatus.getHeaderStatus();
  //   console.log(this.respStatus());
  // }
}
