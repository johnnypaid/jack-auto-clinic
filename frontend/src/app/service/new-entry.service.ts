import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { ApiError } from 'src/error/api-error';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class NewEntryService {

  // endpoint = 'http://192.168.254.103:3000/api/entry';
  endpoint = 'http://192.168.254.105:3000/api/entry';

  constructor(private http: HttpClient, private common: CommonService, private apiError: ApiError) { }

  getAllUsers(_passport: string) {
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

  newEntry(data: any, _passport: string) {
    return this.http.post(this.endpoint , data, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('x-auth-token', _passport),  observe: 'response'
    }).pipe(
    );
  }
}
