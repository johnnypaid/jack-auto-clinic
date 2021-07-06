import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  headerStatus: any;

  constructor() { }

  setHeaderStatus(status: any) {
    this.headerStatus = status;
  }

  getHeaderStatus() {
    return this.headerStatus;
  }
}
