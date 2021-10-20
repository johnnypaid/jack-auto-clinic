import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NewEntryService } from '../service/new-entry.service';
import { ProductionService } from '../service/production.service';

@Component({
  selector: 'app-production-tbl',
  templateUrl: './production-tbl.component.html',
  styleUrls: ['./production-tbl.component.scss']
})
export class ProductionTblComponent implements OnInit, OnDestroy {

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
  startColor = false;

  mainTable = true;
  searchTable = false;
  isCollapsed = true;

  pagicont = false;

  prodFormUpdate = this.formBuilder.group({
    id: [''],
    conversion: ['', Validators.required],
    conDate: ['', Validators.required],
    con_stat: ['', Validators.required],
    chassisNum: ['', Validators.required],
    painting: ['', Validators.required],
    paint_started: ['', Validators.required],
    paint_stat: ['', Validators.required],
    mechanical: ['', Validators.required],
    mec_started: ['', Validators.required],
    mec_stat: ['', Validators.required],
    electrical: ['', Validators.required],
    elec_started: ['', Validators.required],
    elec_stat: ['', Validators.required],
    upholstery: ['', Validators.required],
    up_started: ['', Validators.required],
    up_stat: ['', Validators.required],
    trimmer: ['', Validators.required],
    trim_started: ['', Validators.required],
    trim_stat: ['', Validators.required],
    dashboard: ['', Validators.required],
    dash_started: ['', Validators.required],
    dash_stat: ['', Validators.required],
    detailing: ['', Validators.required],
    det_started: ['', Validators.required],
    det_stat: ['', Validators.required],
    qc: ['', Validators.required],
    qc_started: ['', Validators.required],
    qc_stat: ['', Validators.required],
    sold_to: ['', Validators.required],
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
  tableSize = 4;
  tableSizes = [10, 1];


  constructor(
    private entryTbl: NewEntryService,
    private prodTbl: ProductionService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.passport = localStorage.getItem('token');
    console.log(this.passport);
    this.prodTbl.getAllEntry(this.passport)
      .subscribe(resdata => {
      console.log(resdata);
      this.entryTblData = resdata.body;
      this.entryTable = this.entryTblData.data;
      this.count = parseInt(this.entryTblData.prodInfo);
      this.onTableDataChange(1);
      // console.log(this.entryTblData.prodInfo);
    });

    this.mainTable = true;
    this.searchTable = false;
    this.inputKey = true;
  }

  open(content: any, entry: any) {
    console.log(entry);
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
    let con_date, paint_date, mec_date, elec_date, up_date, trim_date, dash_date, det_date, qc_date = '';
    console.log(this.prodFormUpdate.value);
    try {
      if (this.prodFormUpdate.value.conDate != null) {
        let newCondate = this.prodFormUpdate.value.conDate;
        let conDay, conMonth = '';
        if (newCondate.month < 10 ) {
          conMonth = '0' + newCondate.month;
        } else {
          conMonth = newCondate.month;
        }
        if (newCondate.day < 10 ) {
          conDay = '0' + newCondate.day;
        } else {
          conDay = newCondate.day;
        };
        con_date = newCondate.year + '-' + conMonth + '-' + conDay + 'T00:00:00.000+00:00';
        this.prodFormUpdate.value.conDate = con_date;
      } else {
        this.prodFormUpdate.value.conDate = '';
      }

      if (this.prodFormUpdate.value.paint_started != null) {
        let newPaintdate = this.prodFormUpdate.value.paint_started;
        let paintMonth, paintDay = '';
        if (newPaintdate.month < 10 ) {
          paintMonth = '0' + newPaintdate.month;
        } else {
          paintMonth = newPaintdate.month;
        }
        if (newPaintdate.day < 10 ) {
          paintDay = '0' + newPaintdate.day;
        } else {
          paintDay = newPaintdate.day;
        }
        paint_date = newPaintdate.year + '-' + paintMonth + '-' + paintDay + 'T00:00:00.000+00:00';
        this.prodFormUpdate.value.paint_started = paint_date;
      } else {
        this.prodFormUpdate.value.paint_started = '';
      }

      if (this.prodFormUpdate.value.mec_started != null) {
        let newMecdate = this.prodFormUpdate.value.mec_started;
        let mecMonth, mecDay = '';
        if (newMecdate.month < 10 ) {
          mecMonth = '0' + newMecdate.month;
        } else {
          mecMonth = newMecdate.month;
        }
        if (newMecdate.day < 10 ) {
          mecDay = '0' + newMecdate.day;
        } else {
          mecDay = newMecdate.day;
        }
        mec_date = newMecdate.year + '-' + mecMonth + '-' + mecDay + 'T00:00:00.000+00:00';
        this.prodFormUpdate.value.mec_started = mec_date;
      } else {
        this.prodFormUpdate.value.mec_started = '';
      }

      if (this.prodFormUpdate.value.elec_started != null) {
        let newElectdate = this.prodFormUpdate.value.elec_started;
        let electMonth, electDay = '';
        if (newElectdate.month < 10 ) {
          electMonth = '0' + newElectdate.month;
        } else {
          electMonth = newElectdate.month;
        }
        if (newElectdate.day < 10 ) {
          electDay = '0' + newElectdate.day;
        } else {
          electDay = newElectdate.day;
        }
        elec_date = newElectdate.year + '-' + electMonth + '-' + electDay + 'T00:00:00.000+00:00';
        this.prodFormUpdate.value.elec_started = elec_date;
      } else {
        this.prodFormUpdate.value.elec_started = '';
      }
      if (this.prodFormUpdate.value.up_started != null) {
        let newUpdate = this.prodFormUpdate.value.up_started;
        let upMonth, upDay = '';
        if (newUpdate.month < 10 ) {
          upMonth = '0' + newUpdate.month;
        } else {
          upMonth = newUpdate.month;
        }
        if (newUpdate.day < 10 ) {
          upDay = '0' + newUpdate.day;
        } else {
          upDay = newUpdate.day;
        }
        up_date = newUpdate.year + '-' + upMonth + '-' + upDay + 'T00:00:00.000+00:00';
        this.prodFormUpdate.value.up_started = up_date;
      } else {
        this.prodFormUpdate.value.up_started = '';
      }
      if (this.prodFormUpdate.value.trim_started != null) {
        let newTrimdate = this.prodFormUpdate.value.trim_started;
        let trimMonth, trimDay = '';
        if (newTrimdate.month < 10 ) {
          trimMonth = '0' + newTrimdate.month;
        } else {
          trimMonth = newTrimdate.month;
        }
        if (newTrimdate.day < 10 ) {
          trimDay = '0' + newTrimdate.day;
        } else {
          trimDay = newTrimdate.day;
        }
        trim_date = newTrimdate.year + '-' + trimMonth + '-' + trimDay + 'T00:00:00.000+00:00';
        this.prodFormUpdate.value.trim_started = trim_date;
      } else {
        this.prodFormUpdate.value.trim_started = '';
      }
      if (this.prodFormUpdate.value.dash_started != null) {
        let newDashdate = this.prodFormUpdate.value.dash_started;
        let dashMonth, dashDay = '';
        if (newDashdate.month < 10 ) {
          dashMonth = '0' + newDashdate.month;
        } else {
          dashMonth = newDashdate.month;
        }
        if (newDashdate.day < 10 ) {
          dashDay = '0' + newDashdate.day;
        } else {
          dashDay = newDashdate.day;
        }
        dash_date = newDashdate.year + '-' + dashMonth + '-' + dashDay + 'T00:00:00.000+00:00';
        this.prodFormUpdate.value.dash_started = dash_date;
      } else {
        this.prodFormUpdate.value.dash_started = '';
      }
      if (this.prodFormUpdate.value.det_started != null) {
        let newDetdate = this.prodFormUpdate.value.det_started;
        let detMonth, detDay = '';
        if (newDetdate.month < 10 ) {
          detMonth = '0' + newDetdate.month;
        } else {
          detMonth = newDetdate.month;
        }
        if (newDetdate.day < 10 ) {
          detDay = '0' + newDetdate.day;
        } else {
          detDay = newDetdate.day;
        }
        det_date = newDetdate.year + '-' + detMonth + '-' + detDay + 'T00:00:00.000+00:00';
        this.prodFormUpdate.value.det_started = det_date;
      } else {
        this.prodFormUpdate.value.det_started = '';
      }
      if (this.prodFormUpdate.value.qc_started !== null) {
        let newQcdate = this.prodFormUpdate.value.qc_started;
        let qcMonth, qcDay = '';
        if (newQcdate.month < 10 ) {
          qcMonth = '0' + newQcdate.month;
        } else {
          qcMonth = newQcdate.month;
        }
        if (newQcdate.day < 10 ) {
          qcDay = '0' + newQcdate.day;
        } else {
          qcDay = newQcdate.day;
        }
        qc_date = newQcdate.year + '-' + qcMonth + '-' + qcDay + 'T00:00:00.000+00:00';
        this.prodFormUpdate.value.qc_started = qc_date;
      } else {
        this.prodFormUpdate.value.qc_started = '';
      }


      this.prodTbl.newEntryUpdate(this.prodFormUpdate.value, this.passport)
        .subscribe(resdata => {
          console.log(resdata);
          if (resdata.status === 200) {
            this.editSuccess = true;
            this.editMessage = 'Updated sucessfully';
            this.ngOnInit();
          }
        }, error => {
          console.log(error.error)
        });

    } catch {
      console.log('Oops somthing went wrong!');
    }
    console.log(this.prodFormUpdate.value);
  }

  setModalEntryValue(entry: any) {
    const fullYear = new Date().getFullYear();

    this.prodFormUpdate.controls.id.setValue(entry._id);
    this.prodFormUpdate.controls.chassisNum.setValue(entry.chassisNum);
    this.prodFormUpdate.controls.conversion.setValue(entry.conversion);
    if (entry.conDate != null) {
      this.prodFormUpdate.controls.conDate.setValue(
        {
          year: parseInt(entry.conDate.slice(0,4)),
          month: parseInt(entry.conDate.slice(5,7)),
          day: parseInt(entry.conDate.slice(8,10))
        });;
    } else {
      this.prodFormUpdate.controls.conDate.setValue({year: fullYear, month: 1, day: 1});
    }
    this.prodFormUpdate.controls.con_stat.setValue(entry.con_stat);

    this.prodFormUpdate.controls.painting.setValue(entry.painting);
    if (entry.paint_started != null) {
      this.prodFormUpdate.controls.paint_started.setValue(
        {
          year: parseInt(entry.paint_started.slice(0,4)),
          month: parseInt(entry.paint_started.slice(5,7)),
          day: parseInt(entry.paint_started.slice(8,10))
        });
    } else {
      this.prodFormUpdate.controls.paint_started.setValue({year: fullYear, month: 1, day: 1});
    }
    this.prodFormUpdate.controls.paint_stat.setValue(entry.paint_stat);
    this.prodFormUpdate.controls.paint_started.value;

    this.prodFormUpdate.controls.mechanical.setValue(entry.mechanical);
    if (entry.mec_started != null) {
      this.prodFormUpdate.controls.mec_started.setValue(
        {
          year: parseInt(entry.mec_started.slice(0,4)),
          month: parseInt(entry.mec_started.slice(5,7)),
          day: parseInt(entry.mec_started.slice(8,10))
        });
    } else {
      this.prodFormUpdate.controls.mec_started.setValue({year: fullYear, month: 1, day: 1});
    }
    this.prodFormUpdate.controls.mec_stat.setValue(entry.mec_stat);

    if(entry.electrical != '') {
      this.prodFormUpdate.controls.electrical.setValue(entry.electrical);
    } else {
      this.prodFormUpdate.controls.electrical.setValue('');
    }
    if (entry.elec_started != null) {
      this.prodFormUpdate.controls.elec_started.setValue(
        {
          year: parseInt(entry.elec_started.slice(0,4)),
          month: parseInt(entry.elec_started.slice(5,7)),
          day: parseInt(entry.elec_started.slice(8,10))
        });
    } else {
      this.prodFormUpdate.controls.elec_started.setValue({year: fullYear, month: 1, day: 1});
    }
    if (entry.elec_stat != null) {
      this.prodFormUpdate.controls.elec_stat.setValue(entry.elec_stat);
    } else {
      this.prodFormUpdate.controls.elec_stat.setValue('');
    }
    

    this.prodFormUpdate.controls.upholstery.setValue(entry.upholstery);
    if (entry.up_started != null) {
      this.prodFormUpdate.controls.up_started.setValue(
        {
          year: parseInt(entry.up_started.slice(0,4)),
          month: parseInt(entry.up_started.slice(5,7)),
          day: parseInt(entry.up_started.slice(8,10))
        });
    } else {
      this.prodFormUpdate.controls.up_started.setValue({year: fullYear, month: 1, day: 1});
    }
    this.prodFormUpdate.controls.up_stat.setValue(entry.up_stat);

    this.prodFormUpdate.controls.trimmer.setValue(entry.trimmer);
    if (entry.trim_started != null) {
      this.prodFormUpdate.controls.trim_started.setValue(
        {
          year: parseInt(entry.trim_started.slice(0,4)),
          month: parseInt(entry.trim_started.slice(5,7)),
          day: parseInt(entry.trim_started.slice(8,10))
        });
    } else {
      this.prodFormUpdate.controls.trim_started.setValue({year: fullYear, month: 1, day: 1});
    }
    this.prodFormUpdate.controls.trim_stat.setValue(entry.trim_stat);

    this.prodFormUpdate.controls.dashboard.setValue(entry.dashboard);
    if (entry.dash_started != null) {
      this.prodFormUpdate.controls.dash_started.setValue(
        {
          year: parseInt(entry.dash_started.slice(0,4)),
          month: parseInt(entry.dash_started.slice(5,7)),
          day: parseInt(entry.dash_started.slice(8,10))
        });
    } else {
      this.prodFormUpdate.controls.dash_started.setValue({year: fullYear, month: 1, day: 1});
    }
    this.prodFormUpdate.controls.dash_stat.setValue(entry.dash_stat);

    this.prodFormUpdate.controls.detailing.setValue(entry.detailing);
    if (entry.det_started != null) {
      this.prodFormUpdate.controls.det_started.setValue(
        {
          year: parseInt(entry.det_started.slice(0,4)),
          month: parseInt(entry.det_started.slice(5,7)),
          day: parseInt(entry.det_started.slice(8,10))
        });
    } else {
      this.prodFormUpdate.controls.det_started.setValue({year: fullYear, month: 1, day: 1});
    }
    this.prodFormUpdate.controls.det_stat.setValue(entry.det_stat);

    this.prodFormUpdate.controls.qc.setValue(entry.qc);
    if (entry.qc_started != null) {
      this.prodFormUpdate.controls.qc_started.setValue(
        {
          year: parseInt(entry.qc_started.slice(0,4)),
          month: parseInt(entry.qc_started.slice(5,7)),
          day: parseInt(entry.qc_started.slice(8,10))
        });
    } else {
      this.prodFormUpdate.controls.qc_started.setValue({year: fullYear, month: 1, day: 1});
    }
    this.prodFormUpdate.controls.qc_stat.setValue(entry.qc_stat);
    this.prodFormUpdate.controls.sold_to.setValue(entry.sold_to);
  }

  onDelete() {
    console.log(this.delId);
    try {
      if (this.delId === '' || this.delId == null) {
        this.delMessage = 'No data to delete.'
      } else {
        this.prodTbl.delEntry(this.delId, this.passport)
        .subscribe(resdata => {
          console.log(resdata);
          if (resdata.status === 200) {
            this.delSuccess = true;
            this.delMessage = 'Successfully deleted.'
            this.delId = '';
            this.ngOnInit();
          }
        }, error => {
          console.log(error.message)
        });
      }
    } catch {
      console.log('Oops something went wrong!');
    }
  }

  openDel(del: any, entry: any) {
    this.delId = entry._id;
    this.chassisNum = entry.chassisNum;

    this.modalService.open(del, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      this.delMessage = ''
      this.delSuccess = false;
    });
  }

  search() {
    let option: any;

    if (this.searchForm.value.searchInput !== '' && this.searchForm.value.searhOption !== '') {
      switch (parseInt(this.searchForm.value.searhOption)) {
        case 1: {
          this.inputKey = true;
          option = {field: 'sold_to', keyword: this.searchForm.value.searchInput};
          this.searchEntry(option);
          break;
        }
        case 2: {
          this.inputKey = true;
          option = {field: 'chassisNum', keyword: this.searchForm.value.searchInput};
          this.searchEntry(option);
          break;
        }
        case 5: {
          this.inputKey = true;
          this.searchForm.controls.searchInput.setValue('');
          option = {field: 'default', keyword: ''};
          this.searchEntry(option);
          break;
        }
        // case 3: {
        //   this.inputKey = true;
        //   this.searchForm.value.searhOption = 'bodyType';
        //   option = {field: 'bodyType', keyword: this.searchForm.value.searchInput};
        //   this.searchEntry(option);
        //   break;
        // }
        default: {
          this.inputKey = true;
          break;
        }
      }
    } else if (parseInt(this.searchForm.value.searhOption) === 4) {

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
    } else {
      this.ngOnInit();
    }
  }

  searchEntry (option: any) {
    console.log(option);

    if (option.field === 'chassisNum') {
      this.pagicont = true;
    } else {
      this.pagicont = false;
    }

    this.prodTbl.entrySearch(option, this.passport)
      .subscribe(resdata => {
        this.entryTable = [];
        this.entryTblData = resdata.body;
        this.entryTable = this.entryTblData.result;
        console.log(this.entryTblData);
        this.entryTbl.setTable(this.entryTable);
        this.count = this.entryTblData.prodCount;
        this.mainTable = false;
        this.searchTable = true;
      });
  }

  onTableDataChange(event: any){
    const pagiSearch = {};
    
    console.log(event);

    const pagProd = {passport: this.passport, page: event};

    this.prodTbl.paginateProd(pagProd)
      .subscribe(resdata => {
        // console.log(resdata.body);
        this.page = event;
        this.entryTblData = resdata.body;
        this.entryTable = this.entryTblData.data;
      });
    this.prodTbl = this.prodTbl;
  }

  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = event;
    this.prodTbl  = this.prodTbl;
  }

  
  ngOnDestroy() {
    localStorage.removeItem('current');
  }

}