import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { ApiError } from 'src/error/api-error';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  endpoint = 'http://192.168.254.103:3000/login'; 

  constructor(private http: HttpClient, private apiError: ApiError) { }

  getUser(data: any) {
    const userData = {email: data.value.email, password: data.value.password};
    // console.log(userData);
    return this.http.post(this.endpoint, userData, { headers: new HttpHeaders()
      .set('Content-Type', 'application/json'), observe: 'response' }).pipe(
        catchError(this.apiError.handleError)
      );
  }
}
