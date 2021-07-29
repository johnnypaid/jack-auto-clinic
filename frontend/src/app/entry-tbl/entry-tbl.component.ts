import { Component, OnInit } from '@angular/core';
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

  constructor(private entryTbl: NewEntryService) { }

  ngOnInit(): void {
    this.passport = localStorage.getItem('token');
    this.entryTbl.getAllUsers(this.passport)
      .subscribe(resdata => {
      this.entryTblData = resdata.body;
      this.entryTable = this.entryTblData;
      console.log(this.entryTable[0]);
    });
  }
}
