import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  endpoint = 'http://localhost:3000/api/registration';
  // endpoint = 'http://192.168.254.103:3000/api/registration';
  // endpoint = 'http://192.168.1.20:3000/api/registration';

  constructor(private http: HttpClient) { }

  getAllEntry(_passport: string) {
    return this.http.get(this.endpoint, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('x-auth-token', _passport),  observe: 'response'
    }).pipe(
      map(data => {
        return data;
      })
    );
  }

  newRegistration(data: any, _passport: string) {
    console.log(data);
    return this.http.post(this.endpoint , data, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('x-auth-token', _passport),  observe: 'response'
    }).pipe(
    );
  }

  entrySearch(data: any, _passport: string) {
    console.log(data);

    return this.http.get(this.endpoint + '/' + data.field + '/' + data.keyword, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('x-auth-token', _passport),  observe: 'response'
    }).pipe(
      map(data => {
        return data;
      })
    );
  }

  newEntryUpdate(data: any, _passport: string) {
    console.log(this.endpoint + '/' + data.id)
    return this.http.put(this.endpoint + '/' + data.id , data, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('x-auth-token', _passport),  observe: 'response'
    }).pipe(
    );
  }

  delEntry(id: any, _passport: string) {
    console.log(this.endpoint + '/' + id)
    return this.http.delete(this.endpoint + '/' + id, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('x-auth-token', _passport),  observe: 'response'
    }).pipe(
    );
  }
}
