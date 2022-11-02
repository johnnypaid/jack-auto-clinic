import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbActiveModal, NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NewEntryService } from '../service/new-entry.service';

@Component({
  selector: 'app-entry-tbl',
  templateUrl: './entry-tbl.component.html',
  styleUrls: ['./entry-tbl.component.scss']
})
export class EntryTblComponent implements OnInit, OnDestroy {

  passport: any;
  entryTblData: any
  entryTable: any[] = [];
  closeResult = '';
  model: NgbDateStruct | undefined;

  delSuccess = false;
  editSuccess = false;
  delMessage = '';
  editMessage = '';
  delId = '';
  chassisNum = '';
  engineNum = '';
  bodyCode = '';
  supplier = '';
  unitDesc = '';

  mainTable = true;
  searchTable = false;

  entryFormUpdate = this.formBuilder.group({
    id: [{value: '', isReadonly: true}],
    chassisNum: ['', Validators.required],
    engineNum: ['', Validators.required],
    bodyCode: ['', Validators.required],
    supplier: ['', Validators.required],
    containerNum: ['', Validators.required],
    dateArrived: ['', Validators.required],
    unitDesc: [''],
  });

  searchForm = this.formBuilder.group({
    searchInput: '',
    searhOption: '',
  });
  isSelected = true;
  inputKey = false;

  page = 1;
  count = 0;
  tableSize = 10;
  tableSizes = [10, 1];
  showPagination = true;


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
      console.log(this.entryTable);
    });

    this.mainTable = true;
    this.searchTable = false;
    this.inputKey = true;

    console.log(localStorage.getItem('current'));
  }

  open(content: any, entry: any) {
    // console.log(entry);
    this.setModalEntryValue(entry);

    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      this.editSuccess = false;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      this.editSuccess = false;
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
    console.log(this.entryFormUpdate.value);
    console.log(this.entryFormUpdate.valid);

    if (this.entryFormUpdate.valid) {
      let newCondate = this.entryFormUpdate.value.dateArrived;
      let conDay, conMonth = ''
      newCondate.month < 10 ? conMonth = '0' + newCondate.month : conMonth = newCondate.month;
      newCondate.day < 10 ? conDay = '0' + newCondate.day : conDay = newCondate.day
      this.entryFormUpdate.value.dateArrived = `${newCondate.year}-${conMonth}-${conDay}`;

      try {
        this.entryTbl.newEntryUpdate(this.entryFormUpdate.value, this.passport)
        .subscribe(resdata => {
          console.log(resdata.status);
          if (resdata.status === 200) {
            this.editSuccess = true;
            this.editMessage = 'Succesfully edited the data.';
            this.inputKey = false;
            this.ngOnInit();
          }
        });
      } catch (error) {
        console.log(error);
      }
    }
  }

  setModalEntryValue(entry: any) {
    this.entryFormUpdate.controls.id.setValue(entry._id);
    this.entryFormUpdate.controls.chassisNum.setValue(entry.chassisNum);
    this.entryFormUpdate.controls.engineNum.setValue(entry.engineNum);
    this.entryFormUpdate.controls.bodyCode.setValue(entry.bodyCode);
    this.entryFormUpdate.controls.supplier.setValue(entry.supplier);
    this.entryFormUpdate.controls.containerNum.setValue(entry.containerNum);
    this.entryFormUpdate.controls.dateArrived.setValue({
      year: parseInt(entry.dateArrived.slice(0,4)),
      month: parseInt(entry.dateArrived.slice(5,7)),
      day: parseInt(entry.dateArrived.slice(8,10))
    });
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
      this.delSuccess = false;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      this.delSuccess = false;
    });
  }

  search() {
    let option: any;

    if (this.searchForm.value.searchInput !== '' && this.searchForm.value.searhOption !== '') {
      switch (parseInt(this.searchForm.value.searhOption)) {
        // case 1: {
        //   // this.inputKey = true;
        //   option = {field: 'engineNum', keyword: this.searchForm.value.searchInput};
        //   this.searchEntry(option);
        //   break;
        // }
        case 2: {
          // this.inputKey = true;
          option = {field: 'chassisNum', keyword: this.searchForm.value.searchInput};
          this.searchEntry(option);
          break;
        }
        case 3: {
          // this.inputKey = true;
          this.searchForm.value.searhOption = 'supplier';
          option = {field: 'supplier', keyword: this.searchForm.value.searchInput};
          this.searchEntry(option);
          break;
        }
        case 4: {
          // this.inputKey = true;
          this.searchForm.value.searhOption = 'date';
          option = {field: 'date', keyword: this.searchForm.value.searchInput};
          this.searchEntry(option);
          break;
        }
        default: {
          this.inputKey = true;
          break;
        }
      }
    } else {
      this.ngOnInit();
    }
  }

  searchEntry (option: any) {
    this.entryTbl.entrySearch(option, this.passport)
      .subscribe(resdata => {
        console.log(resdata)
        this.entryTable = [];
        this.entryTblData = resdata.body;
        this.entryTable = this.entryTblData.data;
        this.entryTbl.setTable(resdata.body);
        this.mainTable = false;
        this.searchTable = true;
        this.onTableDataChange(event);

        this.entryTable.length > 0 ? this.showPagination = true : this.showPagination = false;
      });
  }

  onTableDataChange(event: any){
    this.page = event;
    this.entryTable = this.entryTable;
  }

  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.entryTable  = this.entryTable;
  }

  ngOnDestroy() {
    localStorage.removeItem('current');
  }
}
