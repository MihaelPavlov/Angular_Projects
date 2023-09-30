import {Injectable, ViewChild} from "@angular/core";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";

@Injectable()
export class DataListServie<T> {
  private data!: MatTableDataSource<T>
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor() {

  }
  initializeData(data: T[]): MatTableDataSource<T> {
    this.data = new MatTableDataSource<T>(data);
    return this.data
  }
}

declare module '@angular/material/table' {
  interface MatTableDataSource<T> {
    addPagination(pagination: MatPaginator): MatTableDataSource<T>;
    addSorting(sorting: MatSort): MatTableDataSource<T>;
  }
}

MatTableDataSource.prototype.addPagination = function<T> (pagination:MatPaginator): MatTableDataSource<T> {
this.paginator = pagination;
return this;
};
MatTableDataSource.prototype.addSorting = function<T> (sorting:MatSort): MatTableDataSource<T> {
this.sort = sorting;
return this
};

