import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  endpoint = 'http://192.168.254.105:3000/api/registration';

  constructor(private http: HttpClient) { }

  newRegistration(data: any, _passport: string) {
    console.log(data);
    return this.http.post(this.endpoint , data, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('x-auth-token', _passport),  observe: 'response'
    }).pipe(
    );
  }
}
