import { CommonService } from './common.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { ApiError } from 'src/error/api-error';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  endpoint = 'http://192.168.254.103:3000/api/users';

  constructor(private http: HttpClient, private common: CommonService, private apiError: ApiError) { }

  getAllUsers() {
    console.log(localStorage.getItem('teryo'));
  }

  createUser(data: any, _passport: string) {
    return this.http.post(this.endpoint , data, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('x-auth-token', _passport),  observe: 'response'
    }).pipe(
    );
  }
}