import {Component, OnDestroy, OnInit} from "@angular/core";
import {select, Store} from "@ngrx/store";
import * as fromPortfolioSelectors from "../../portfolio/portfolio.selectors";
import * as fromPortfolioActions from "../../portfolio/portfolio.action";
import {DataListService} from "../../../services/data-list.servie";
import {IInvestment} from "../../../models/investment";
import {InvestmentService} from "../../../services/investment.service";
import {Router} from "@angular/router";
import {ToastService} from "../../../../shared/services/toast.service";
import {AppState} from "../../../../shared/ngrx/app.reducer";
import {Observable, Subscription} from "rxjs";
import {IUser} from "../../../models/user";

@Component({
  selector: "dashboard",
  templateUrl: "dashboard.component.html",
  styleUrls: ["dashboard.component.css"]
})
export class DashboardComponent implements OnInit, OnDestroy {
  public chartData: any | null = null;
  isLoading$!: Observable<boolean>
  user!: IUser | null
  groupedData: { [investmentName: string]: { sumPrice: number; sumQuantity: number , label: string } } = {};
  investments$!: Observable<IInvestment[]>

  subscriptions: Subscription[] = [];

  constructor(private dataListService: DataListService<IInvestment>,
              private investmentService: InvestmentService,
              private router: Router,
              private toastService: ToastService,
              private store: Store<AppState>) {

    // this.subscriptions.push(this.store.pipe(select(selectAuthUser)).subscribe({
    //   next: response => {
    //     if (response != null) {
    //       this.user = response;
    //     }
    //   }
    // }));
  }

  ngOnDestroy(): void {
    this.groupedData = {}
    this.subscriptions.forEach(x => {
      x.unsubscribe();
    })
  }

  ngOnInit(): void {
    this.isLoading$ = this.store.pipe(select(fromPortfolioSelectors.selectInvestmentIsLoading));
    this.investments$ = this.store.pipe(select(fromPortfolioSelectors.selectInvestmentsList));

    this.store.dispatch(new fromPortfolioActions.GetInvestments({userId: Number(this.user?.id)}));

    this.subscriptions.push(this.investments$.subscribe(x => {
      this.groupedData = {};
      x.forEach((investment) => {
        const {investmentName, purchasePrice, quantity} = investment;
        if (!this.groupedData[investmentName]) {
          this.groupedData[investmentName] = {sumPrice: purchasePrice, sumQuantity: quantity, label:investmentName};
        } else {

          this.groupedData[investmentName].sumPrice += purchasePrice;
          this.groupedData[investmentName].sumQuantity += quantity;
          this.groupedData[investmentName].label = investmentName;
        }
      });
      this.chartData = {
        labels: Object.keys(this.groupedData),
        datasets:
          [{
          data: Object.values(this.groupedData).map((data) =>  data.sumPrice),
          backgroundColor: [
            'rgb(255, 205, 86)',
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
          ],
          hoverOffset: 1,

        }]
      };
    }));
  }
}


