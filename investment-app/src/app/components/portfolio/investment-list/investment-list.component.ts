import {AfterViewInit, Component, OnInit} from "@angular/core";
import {IInvestment} from "../../../models/investment";
import {InvestmentService} from "../../../services/investment.service";
import {MatTableDataSource} from "@angular/material/table";
import {Router} from "@angular/router";
import {AuthService} from "../../../../lib/services/auth.service";
import {IUser} from "../../../models/user";
import {ToastService} from "../../../../lib/services/toast.service";
import {ToastType} from "../../../models/toast";

@Component({
  selector: "investment-list",
  templateUrl: "investment-list.component.html",
  styleUrls: ["investment-list.component.css"]
})
export class InvestmentListComponent implements OnInit, AfterViewInit {
  user?: IUser | null
  dataSource!: MatTableDataSource<IInvestment>;
  displayedColumns: string[] = ['investmentName', 'symbol', 'quantity', 'purchasePrice', 'investmentType', 'actions'];

  constructor(private investmentService: InvestmentService, private router: Router, private authService: AuthService, private toastService: ToastService) {
    this.authService.user$.subscribe(result => {
      this.user = result;
    })
  }

  ngOnInit() {
    console.log('before on init')
    this.investmentService.getInvestments(Number(this.user?.id));
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
    this.investmentService.delete(id).subscribe({
      next: response => {
        this.toastService.success({message: 'Successfully Deleted', type: ToastType.Success})
        this.investmentService.getInvestments(Number(this.user?.id));
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
