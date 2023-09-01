import {AfterViewInit, Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {InvestmentService} from "../../../services/investment.service";
import {IInvestment} from "../../../models/investment";
import {Location} from "@angular/common";

@Component({
  templateUrl: "investment-details.component.html",
  styleUrls: ['investment-details.component.css']
})
export class InvestmentDetailsComponent implements OnInit , AfterViewInit{
  investment!: IInvestment | undefined;

  constructor(private route: ActivatedRoute,
              private investmentService: InvestmentService,
              private location: Location,
              private router: Router) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      let id = params.get('id');
      console.log(id)
      if (typeof id === "string") {
        this.investmentService.getInvestmentById(parseInt(id))
      }
    });
  }

  ngAfterViewInit() {
    this.investmentService.investmentForUpdate$.subscribe(result => {
      if (result != null){
        this.investment = result;
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
