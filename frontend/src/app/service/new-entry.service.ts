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
  // endpoint = 'http://192.168.254.105:3000/api/entry';
  endpoint = 'http://192.168.1.20:3000/api/entry';

  tableData: any;

  constructor(private http: HttpClient, private common: CommonService, private apiError: ApiError) { }

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

  newEntry(data: any, _passport: string) {
    return this.http.post(this.endpoint , data, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('x-auth-token', _passport),  observe: 'response'
    }).pipe(
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

  setTable(data: any) {
    this.tableData = data;
  }

  getTable() {
    return this.tableData;
  }
}
