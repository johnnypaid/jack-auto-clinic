import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductionService {

  endpoint = 'http://192.168.254.103:3000/api/production';
  // endpoint = 'http://192.168.1.20:3000/api/production';

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

  newProduction(data: any, _passport: string) {
    console.log(data);
    return this.http.post(this.endpoint , data, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('x-auth-token', _passport),  observe: 'response'
    }).pipe();
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

  paginateProd(data: any) {
    console.log(data);

    return this.http.get(this.endpoint + '/' + data.page, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('x-auth-token', data.passport),  observe: 'response'
    }).pipe(
      map(data => {
        return data;
      })
    );
  }
}
