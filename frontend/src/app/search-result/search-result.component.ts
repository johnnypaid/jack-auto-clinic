import { SearchService } from './../service/search.service';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { startWith } from 'rxjs/operators';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit, OnDestroy {

  showLoader = false;
  searchData: any;
  entryData: any;
  registryData: any;
  productionData: any;
  chassisEntry = '';
  chassisRegister = '';
  chassisProduction = '';
  closeEntry = '';
  headerTitle = '';

  constructor(private searchResult: SearchService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.showLoader = true;

    this.searchData = this.searchResult.getSearchData();
    this.entryData = this.searchData.entry;
    this.registryData = this.searchData.registry;
    this.productionData = this.searchData.production;
    this.chassisEntry = this.entryData.chassisNum;
    this.chassisRegister = this.searchData.registry.chassisNum;
    this.chassisProduction = this.searchData.production.chassisNum;
    console.log(this.searchData.production);
  }

  viewData(content: any, option: number) {
    this.setModalInfo(option);

    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeEntry = `Closed with: ${result}`;
    }, (reason) => {
      this.closeEntry = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  setModalInfo(option: number) {
    switch(option) {
      case 1: {
        this.headerTitle = 'Entry Data';
        break;
      }
      case 2: {
        this.headerTitle = 'Registration Data';
        break;
      }
      case 3: {
        this.headerTitle = 'Production Data';
        break;
      }
    }
  }

  ngOnDestroy() {
    this.searchData = '';
  }
}
