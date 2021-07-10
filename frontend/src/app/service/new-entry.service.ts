import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiError } from 'src/error/api-error';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class NewEntryService {

  endpoint = 'http://192.168.254.103:3000/api/entry';

  constructor(private http: HttpClient, private common: CommonService, private apiError: ApiError) { }

  getAllUsers() {
   
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
