import { SearchService } from './../service/search.service';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

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

  closeEntry = '';

  constructor(private searchResult: SearchService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.showLoader = true;

    this.searchData = this.searchResult.getSearchData();
    this.chassisEntry = this.searchData.entry.chassisNum;
    this.chassisRegister = this.searchData.registry.chassisNum;
    this.chassisProduction = this.searchData.production.chassisNum;
    console.log(this.searchResult.getSearchData());
  }

  entry(content: any) {
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

  ngOnDestroy() {
    this.searchData = '';
  }
}
