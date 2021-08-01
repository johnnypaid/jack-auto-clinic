import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.scss']
})
export class EntryComponent implements OnInit {
  @Input() name: any;
  modalService: any;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

//   open() {
//     const modalRef = this.modalService.open(NgbdModalContent);
//     modalRef.componentInstance.name = 'World';
//   }

// }
// function NgbdModalContent(NgbdModalContent: any) {
//   throw new Error('Function not implemented.');
}
