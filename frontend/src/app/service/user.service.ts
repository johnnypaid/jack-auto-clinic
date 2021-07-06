import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  endpoint = 'http://localhost:3000/api/users';

  constructor(private httpClient: HttpClient) { }

  getAllUsers() {
    console.log(localStorage.getItem('teryo'));
  }
}
