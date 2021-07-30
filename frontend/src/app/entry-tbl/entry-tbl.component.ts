import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NewEntryService } from '../service/new-entry.service';

@Component({
  selector: 'app-entry-tbl',
  templateUrl: './entry-tbl.component.html',
  styleUrls: ['./entry-tbl.component.scss']
})
export class EntryTblComponent implements OnInit {

  passport: any;
  entryTblData: any
  entryTable: any[] = [];
  closeResult = '';

  delSuccess = false;
  delMessage = '';
  delId = '';
  chassisNum = '';
  engineNum = '';
  bodyCode = '';
  supplier = '';
  unitDesc = '';

  entryFormUpdate = this.formBuilder.group({
    id: [{value: '', disabled: true}],
    chassisNum: ['', Validators.required],
    engineNum: ['', Validators.required],
    bodyCode: ['', Validators.required],
    supplier: ['', Validators.required],
    containerNum: ['', Validators.required],
    unitDesc: [''],
  });


  constructor(
    private entryTbl: NewEntryService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.passport = localStorage.getItem('token');
    this.entryTbl.getAllEntry(this.passport)
      .subscribe(resdata => {
      this.entryTblData = resdata.body;
      this.entryTable = this.entryTblData;
      console.log(this.entryTable[0]);
    });
  }

  open(content: any, entry: any) {
    // console.log(entry);
    this.setModalEntryValue(entry);

    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
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

  onSubmit() {
    // console.log(this.entryFormUpdate.value);
    this.entryTbl.newEntryUpdate(this.entryFormUpdate.getRawValue(), this.passport)
      .subscribe(resdata => {
        console.log(resdata.status);
        if (resdata.status === 200) {
          this.ngOnInit();
        }
      });
  }

  setModalEntryValue(entry: any) {
    this.entryFormUpdate.controls.id.setValue(entry._id);
    this.entryFormUpdate.controls.chassisNum.setValue(entry.chassisNum);
    this.entryFormUpdate.controls.engineNum.setValue(entry.engineNum);
    this.entryFormUpdate.controls.bodyCode.setValue(entry.bodyCode);
    this.entryFormUpdate.controls.supplier.setValue(entry.supplier);
    this.entryFormUpdate.controls.containerNum.setValue(entry.containerNum);
    this.entryFormUpdate.controls.unitDesc.setValue(entry.unitDesc);
  }

  onDelete() {
    console.log(this.delId);
    if (this.delId === '' || this.delId === null) {
      this.delMessage = 'No data to delete.'
    } else {
      this.entryTbl.delEntry(this.delId, this.passport)
      .subscribe(resdata => {
        console.log(resdata);
        if (resdata.status === 200) {
          this.delSuccess = true;
          this.delMessage = 'Successfully deleted.'
          this.delId = '';
          this.ngOnInit();
        }
      });
    }
  }

  openDel(del: any, entry: any) {
    this.delId = entry._id;
    this.chassisNum = entry.chassisNum;
    this.engineNum = entry.engineNum;
    this.bodyCode = entry.bodyCode;

    this.modalService.open(del, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      this.delSuccess = false;
    });
  }
}
