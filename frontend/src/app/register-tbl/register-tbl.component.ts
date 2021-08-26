import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NewEntryService } from '../service/new-entry.service';
import { RegistrationService } from '../service/registration.service';

@Component({
  selector: 'app-register-tbl',
  templateUrl: './register-tbl.component.html',
  styleUrls: ['./register-tbl.component.scss']
})
export class RegisterTblComponent implements OnInit, OnDestroy {

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
  bodyType = '';
  supplier = '';
  unitDesc = '';

  mainTable = true;
  searchTable = false;

  entryFormUpdate = this.formBuilder.group({
    id: [{value: '', disabled: true}],
    chassisNum: ['', Validators.required],
    engineNum: ['', Validators.required],
    bodyType: ['', Validators.required],
    name: ['', Validators.required],
    mvNum: ['', Validators.required],
    plateNum: ['', Validators.required],
    color: ['', Validators.required],
    date: ['', Validators.required]
  });

  searchForm = this.formBuilder.group({
    searchInput: '',
    searhOption: '',
    date: ''
  });
  isSelected = true;
  inputKey = false;

  page = 1;
  count = 0;
  tableSize = 10;
  tableSizes = [10, 1];


  constructor(
    private entryTbl: NewEntryService,
    private regTbl: RegistrationService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.passport = localStorage.getItem('token');
    this.regTbl.getAllEntry(this.passport)
      .subscribe(resdata => {
      this.entryTblData = resdata.body;
      this.entryTable = this.entryTblData;
      console.log(this.entryTable[0]);
    });

    this.mainTable = true;
    this.searchTable = false;
    this.inputKey = true;
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
    this.regTbl.newEntryUpdate(this.entryFormUpdate.getRawValue(), this.passport)
      .subscribe(resdata => {
        console.log(resdata.status);
        if (resdata.status === 200) {
          this.editSuccess = true;
          this.editMessage = 'Succesfully edited the data.';
          this.inputKey = false;
          this.ngOnInit();
        }
      });
  }

  setModalEntryValue(entry: any) {
    console.log(entry)
    this.entryFormUpdate.controls.id.setValue(entry._id);
    this.entryFormUpdate.controls.chassisNum.setValue(entry.chassisNum);
    this.entryFormUpdate.controls.engineNum.setValue(entry.engineNum);
    this.entryFormUpdate.controls.bodyType.setValue(entry.bodyType);
    this.entryFormUpdate.controls.plateNum.setValue(entry.plateNum);
    this.entryFormUpdate.controls.color.setValue(entry.color);
    this.entryFormUpdate.controls.mvNum.setValue(entry.mvNum);
    this.entryFormUpdate.controls.name.setValue(entry.name);
    this.entryFormUpdate.controls.date.setValue(entry.date.slice(0, 10));
  }

  onDelete() {
    console.log(this.delId);
    if (this.delId === '' || this.delId === null) {
      this.delMessage = 'No data to delete.'
    } else {
      this.regTbl.delEntry(this.delId, this.passport)
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
    this.bodyType = entry.bodyType;

    this.modalService.open(del, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      this.delSuccess = false;
    });
  }

  search() {
    let option: any;

    if (this.searchForm.value.searchInput !== '' && this.searchForm.value.searhOption !== '') {
      switch (parseInt(this.searchForm.value.searhOption)) {
        case 1: {
          this.inputKey = true;
          option = {field: 'engineNum', keyword: this.searchForm.value.searchInput};
          this.searchEntry(option);
          break;
        }
        case 2: {
          this.inputKey = true;
          option = {field: 'chassisNum', keyword: this.searchForm.value.searchInput};
          this.searchEntry(option);
          break;
        }
        case 3: {
          this.inputKey = true;
          this.searchForm.value.searhOption = 'bodyType';
          option = {field: 'bodyType', keyword: this.searchForm.value.searchInput};
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

    if (parseInt(this.searchForm.value.searhOption) === 4) {

      this.inputKey = false;

      if (this.searchForm.value.searchInput.date !== "") {
        const year = this.searchForm.value.date.year;
        let month = this.searchForm.value.date.month;
        let day = this.searchForm.value.date.day;

        if (year !== undefined || month !== undefined || day !== undefined) {
          if (month < 10) {
            month = '0' + month;
          }
          if (day < 10) {
            day = '0' + day;
          }
          let newDate = year + '-' + month + '-' + day;
          option = {field: 'date', keyword: newDate};
          this.searchEntry(option);
        }
      }
    }
  }

  searchEntry (option: any) {
    this.regTbl.entrySearch(option, this.passport)
      .subscribe(resdata => {
        console.log(resdata)
        this.entryTable = [];
        this.entryTblData = resdata.body;
        this.entryTable = this.entryTblData;
        this.entryTbl.setTable(resdata.body);
        this.mainTable = false;
        this.searchTable = true;
        this.onTableDataChange(event);
      });
  }

  onTableDataChange(event: any){
    this.page = event;
    this.regTbl = this.regTbl;
  }

  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.regTbl  = this.regTbl;
  }

  ngOnDestroy() {
    localStorage.removeItem('current');
  }
}
