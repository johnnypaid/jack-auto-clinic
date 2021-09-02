import { SearchService } from './../service/search.service';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit, OnDestroy {

  showLoader = false;
  searchData: any;
  chassisEntry = '';
  chassisRegister = '';
  chassisProduction = '';

  constructor(private searchResult: SearchService) { }

  ngOnInit(): void {
    this.showLoader = true;

    this.searchData = this.searchResult.getSearchData();
    this.chassisEntry = this.searchData.entry.chassisNum;
    this.chassisRegister = this.searchData.registry.chassisNum;
    this.chassisProduction = this.searchData.production.chassisNum;
  }

  ngOnDestroy() {
    this.searchData = '';
  }
}
