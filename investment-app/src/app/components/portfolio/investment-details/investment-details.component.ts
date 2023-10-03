import {AfterViewInit, Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {InvestmentService} from "../../../services/investment.service";
import {IInvestment} from "../../../models/investment";
import {Location} from "@angular/common";
import {select, Store} from "@ngrx/store";
import {InvestmentInitialState} from "../portfolio.reducer";
import {selectInvestmentState} from "../portfolio.selectors";
import {GetInvestmentById} from "../portfolio.action";

@Component({
  templateUrl: "investment-details.component.html",
  styleUrls: ['investment-details.component.css']
})
export class InvestmentDetailsComponent implements OnInit, AfterViewInit {
  investment!: IInvestment | null;

  constructor(private readonly route: ActivatedRoute,
              private readonly investmentService: InvestmentService,
              private readonly location: Location,
              private readonly router: Router,
              private readonly store: Store<InvestmentInitialState>) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      let id = params.get('id');
      console.log(id)
      if (typeof id === "string") {
        this.store.dispatch(new GetInvestmentById({investmentId: parseInt(id)}))

        // this.investmentService.getInvestmentById(parseInt(id))
      }
    });
  }

  ngAfterViewInit() {
    this.store.pipe(select(selectInvestmentState)).subscribe(result => {
      if (result != null) {
        this.investment = result.investment;
      }
    });
  }

  onBackClicked() {
    this.location.back();
  }

  onEditClicked() {
    this.router.navigate(['update', this.investment!.id]);
  }
}
