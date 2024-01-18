import { Component, Input, OnInit, SimpleChanges } from "@angular/core";

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
})
export class PaginationComponent implements OnInit {
  /** The total number of records */
  @Input()
  collectionSize = 0;

  /** The number of records to display */
  @Input()
  pageSize = 5;

  /** Current page */
  @Input()
  currentPage = 1;

  /** The number of buttons to show either side of the current page */
  @Input()
  maxSize = 2;

  /** Display the First/Last buttons */
  @Input()
  firstLastButtons = false;

  /** Display the Next/Previous buttons */
  @Input()
  nextPreviousButtons = true;

  /** Display small pagination buttons */
  @Input()
  small = false;

  totalPages: any[] = [];

  constructor() {}

  ngOnInit(): void {
    this.totalPages = new Array(Math.ceil(this.collectionSize / this.pageSize));
  }

  /** Update totalPage number if the collectionSize or pageSize values change */
  ngOnChanges(changes: SimpleChanges) {
    this.totalPages = new Array(Math.ceil(this.collectionSize / this.pageSize));
  }

  /** Set page number */
  selectPageNumber(pageNumber: number) {
    this.currentPage = pageNumber;
  }

  /** Set next page number */
  next() {
    const nextPage = this.currentPage + 1;
    nextPage <= this.totalPages.length && this.selectPageNumber(nextPage);
  }

  /** Set previous page number */
  previous() {
    const previousPage = this.currentPage - 1;
    previousPage >= 1 && this.selectPageNumber(previousPage);
  }
}
