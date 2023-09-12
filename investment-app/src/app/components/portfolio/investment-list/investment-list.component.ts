import {AfterViewInit, Component, OnInit, ViewChild} from "@angular/core";
import {IInvestment} from "../../../models/investment";
import {InvestmentService} from "../../../services/investment.service";
import {MatTableDataSource} from "@angular/material/table";
import {Router} from "@angular/router";
import {AuthService} from "../../../../lib/services/auth.service";
import {IUser} from "../../../models/user";
import {ToastService} from "../../../../lib/services/toast.service";
import {ToastType} from "../../../models/toast";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort, Sort} from "@angular/material/sort";

@Component({
  selector: "investment-list",
  templateUrl: "investment-list.component.html",
  styleUrls: ["investment-list.component.css"]
})
export class InvestmentListComponent implements OnInit, AfterViewInit {
  user?: IUser | null
  dataSource!: MatTableDataSource<IInvestment>;
  displayedColumns: string[] = ['investmentName', 'symbol', 'quantity', 'purchasePrice', 'investmentType', 'actions'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private investmentService: InvestmentService, private router: Router,
              private authService: AuthService, private toastService: ToastService) {
    this.authService.user$.subscribe(result => {
      this.user = result;
    })
  }

  ngOnInit() {
    this.investmentService.getInvestments(Number(this.user?.id)).subscribe(x=>{
      this.investmentService.fetchInvestments(x);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  ngAfterViewInit() {

    this.investmentService.investment$.subscribe(x => {

      this.dataSource = new MatTableDataSource<IInvestment>(x);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  redirectToDetailsPage(id: number): void {
    this.router.navigate(['investment-details', id]);
  }

  onDelete(id: number): void {
    this.investmentService.delete(id).subscribe({
      next: response => {
        this.toastService.success({message: 'Successfully Deleted', type: ToastType.Success})
        this.investmentService.getInvestments(Number(this.user?.id)).subscribe(x=>{
          this.investmentService.fetchInvestments(x);
        });
      },
      error: response => {
        this.toastService.error({message: 'Something get wrong', type: ToastType.Error})
      }
    });
  }

  onEdit(id: number): void {
    this.router.navigate(['update', id]);
  }
}
