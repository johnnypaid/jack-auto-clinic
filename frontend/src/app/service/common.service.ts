import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class CommonService {

  private pageData: any;
  private userInfo: any;

  constructor() { }

  setUserData(data: any) {
    localStorage.setItem('user', JSON.stringify(data));
  }

  getUserData() {
    return localStorage.getItem('user');
  }
}
