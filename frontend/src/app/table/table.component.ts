import { Component, OnInit } from '@angular/core';
import { NewEntryService } from '../service/new-entry.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  constructor(private tblService: NewEntryService) { }

  ngOnInit(): void {
    console.log(JSON.stringify(this.tblService.getTable()));
  }

}
