import {Component, OnInit, ViewChild} from "@angular/core";
import {FormControl} from "@angular/forms";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {DataListService} from "../../../services/data-list.servie";

export interface historyLogData {
  name: string;
  action: string;
  type: string;
  removedDate: string;
}
const ELEMENT_DATA: historyLogData[] = [
  {name: "test", action:"removed", removedDate:"13/05/2023",type:"Alert"},
  {name: "Neww lorem", action:"added", removedDate:"13/05/2023",type:"Notification"},
  {name: "test", action:"removed", removedDate:"13/05/2023",type:"Alert"},
  {name: "test", action:"removed", removedDate:"13/05/2023",type:"Alert"},
  {name: "test", action:"removed", removedDate:"13/05/2023",type:"Alert"},
  {name: "test", action:"removed", removedDate:"13/05/2023",type:"Alert"},
  {name: "test", action:"removed", removedDate:"13/05/2023",type:"Alert"}

];

@Component({
  selector:"history-log",
  templateUrl:"history-log.component.html",
  styleUrls:["history-log.component.scss"]
})
export class HistoryLogComponent implements OnInit{
  toppings = new FormControl('test');

  toppingList: string[]= ['Action', 'Name', 'Description', 'Type', 'Removed Date', "Appear Date", "Details"];
  displayedColumns: string[] = ['name', 'action', 'type', 'removedDate'];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  data!: MatTableDataSource<historyLogData> ;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private dataListService: DataListService<historyLogData>) {
}
  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.setDataSourceAttributes();
  }

  setDataSourceAttributes() {
    this.data.paginator = this.paginator;

  }
  ngOnInit() {
  this.data = this.dataListService.initializeData(ELEMENT_DATA)
  }

  addColumn() {
    const randomColumn = Math.floor(Math.random() * this.displayedColumns.length);
    this.columnsToDisplay.push(this.displayedColumns[randomColumn]);
  }

  removeColumn() {
    if (this.columnsToDisplay.length) {
      this.columnsToDisplay.pop();
    }
  }

}
