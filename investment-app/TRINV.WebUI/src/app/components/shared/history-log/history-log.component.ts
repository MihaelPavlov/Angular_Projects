import { Component, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DataListService } from '../../../services/data-list.servie';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface historyLogData {
  name: string;
  action: string;
  type: string;
  removedDate: string;
}
const ELEMENT_DATA: historyLogData[] = [
  { name: 'test', action: 'removed', removedDate: '13/05/2023', type: 'Alert' },
  {
    name: 'Neww lorem',
    action: 'added',
    removedDate: '13/05/2023',
    type: 'Notification',
  },
  { name: 'test', action: 'removed', removedDate: '13/05/2023', type: 'Alert' },
  { name: 'test', action: 'removed', removedDate: '13/05/2023', type: 'Alert' },
  { name: 'test', action: 'removed', removedDate: '13/05/2023', type: 'Alert' },
  { name: 'test', action: 'removed', removedDate: '13/05/2023', type: 'Alert' },
  { name: 'test', action: 'removed', removedDate: '13/05/2023', type: 'Alert' },
];

@Component({
  selector: 'history-log',
  templateUrl: 'history-log.component.html',
  styleUrls: ['history-log.component.scss'],
})
export class HistoryLogComponent implements OnInit {
  public form = new FormControl(['test']);

  public data: any;

  public allAvailableHeadings: string[] = [
    'Action',
    'Name',
    'Description',
    'Type',
    'Removed Date',
    'Appear Date',
    'Details',
  ];

  public displayedColumns: string[] = ['name', 'action', 'type', 'removedDate'];

  columnsToDisplay!: string[] ;
  tableData!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private dataListService: DataListService<any>,
    @Inject(MAT_DIALOG_DATA) public dialogData: any
  ) {
 

    console.log("data from history log -> ", this.dialogData);
    
  }
  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.setDataSourceAttributes();
  }

  setDataSourceAttributes() {
    this.tableData.paginator = this.paginator;
  }
  ngOnInit() {
       this.allAvailableHeadings = this.dialogData.allAvailableHeadings;
       this.data = this.dialogData.data;
       this.displayedColumns = this.dialogData.displayedColumns;
       this.columnsToDisplay = this.displayedColumns.slice();
       this.tableData = this.dataListService.initializeData(this.data);
  }

  addColumn() {
    const randomColumn = Math.floor(
      Math.random() * this.displayedColumns.length
    );
    this.columnsToDisplay.push(this.displayedColumns[randomColumn]);
  }

  removeColumn() {
    if (this.columnsToDisplay.length) {
      this.columnsToDisplay.pop();
    }
  }
}
