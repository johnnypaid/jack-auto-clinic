import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  endpoint = 'http://localhost:3000/api/search';
  // endpoint = 'http://192.168.254.103:3000/api/search';
  searchData: any;

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

  searchChasis(data: any) {
    return this.http.get(this.endpoint + '/' + data.chasis.trim(), {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('x-auth-token', data.token),  observe: 'response'
    }).pipe(
      map(data => {
        return data;
      })
    );
  }

  setSearchData(data: any) {
    this.searchData = data;
  }

  getSearchData() {
    return this.searchData;
  }
}

