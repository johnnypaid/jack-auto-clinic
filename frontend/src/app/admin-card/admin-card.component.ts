import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-admin-card',
  templateUrl: './admin-card.component.html',
  styleUrls: ['./admin-card.component.scss']
})
export class AdminCardComponent implements OnInit {

  @Output() notifyParent: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }
  sendNotification(value: any) {
    this.notifyParent.emit(value);
  }
}
