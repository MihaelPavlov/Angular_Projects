import {AfterViewInit, Component, OnInit} from "@angular/core";
import {IInvestment} from "../../../models/investment";
import {InvestmentService} from "../../../services/investment.service";
import {MatTableDataSource} from "@angular/material/table";
import {Router} from "@angular/router";
import {Observable, tap} from "rxjs";

@Component({
  selector: "investment-list",
  templateUrl: "investment-list.component.html",
  styleUrls: ["investment-list.component.css"]
})
export class InvestmentListComponent implements OnInit, AfterViewInit {
  dataSource!: MatTableDataSource<IInvestment>;
  displayedColumns: string[] = ['investmentName', 'symbol', 'quantity', 'purchasePrice', 'investmentType', 'actions'];

  constructor(private investmentService: InvestmentService, private router: Router) {
  }

  ngOnInit() {
    console.log('before on init')
    this.investmentService.getInvestments();
    console.log('after on init')
  }

  ngAfterViewInit() {
    this.investmentService.investment$.subscribe(x => {
      console.log('inside subscriber after View Init')

      this.dataSource = new MatTableDataSource<IInvestment>(x);
    })
  }

  redirectToDetailsPage(id: number): void {
    this.router.navigate(['investment-details', id]);
  }

  onDelete(id: number): void {
    this.investmentService.delete(id);
  }

  onEdit(id: number): void {
    this.router.navigate(['update', id]);
  }
}
