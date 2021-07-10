import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class CommonService {

  pageData = '';

  constructor() { }

  setUserData(data: any) {
    this.pageData = data;
  }

  getUserData() {
    return this.pageData;
  }
}
