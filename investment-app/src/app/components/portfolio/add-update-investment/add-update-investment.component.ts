import {Component, Input, OnInit} from "@angular/core";
import {Currency, getCurrencyLabel} from "../../../../enums/currency.enum";
import {
  getInvestmentTypeLabel,
  InvestmentType,
} from "../../../../enums/investment-type.enum";
import {FormControl, FormGroup} from "@angular/forms";
import {InvestmentService} from "../../../services/investment.service";
import {ActivatedRoute, Router} from "@angular/router";
import {catchError, filter} from "rxjs";


@Component({
  selector: "add-update-investment",
  templateUrl: 'add-update-investment.component.html',
  styleUrls: ["add-update-investment.component.css"]
})
export class AddUpdateInvestmentComponent implements OnInit {
  @Input("id") id: number | undefined;

  public currencies!: number[];
  public investmentTypes!: number[];
  public addUpdateForm = new FormGroup({
    investmentName: new FormControl(),
    symbol: new FormControl(),
    quantity: new FormControl(),
    purchasePrice: new FormControl(),
    currency: new FormControl(),
    investmentType: new FormControl(),
  })

  constructor(private investmentService: InvestmentService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.currencies = Object.values(Currency).filter(value => typeof value === 'number') as number[];
    this.investmentTypes = Object.values(InvestmentType).filter(value => typeof value === 'number') as number[];

    this.route.paramMap.subscribe(params => {
      let id = params.get('id');
      if (typeof id === "string") {
        this.id = parseInt(id);
      }
    });

    this.updateModel();
  }

  updateModel(): void {
    if (this.id != undefined) {
      this.investmentService.investmentForUpdate$.subscribe(result => {
        if (result) {
          this.addUpdateForm.patchValue(result)
        }
      })
    }
  }

  onSubmit() {
    console.log(this.addUpdateForm)
    if (this.id != undefined) {
      this.investmentService.update(
        this.id,
        this.addUpdateForm.controls.investmentName.value,
        this.addUpdateForm.controls.symbol.value,
        this.addUpdateForm.controls.quantity.value,
        this.addUpdateForm.controls.purchasePrice.value,
        this.addUpdateForm.controls.currency.value,
        this.addUpdateForm.controls.investmentType.value,
      );

    } else {
      this.investmentService.create(
        this.addUpdateForm.controls.investmentName.value,
        this.addUpdateForm.controls.symbol.value,
        this.addUpdateForm.controls.quantity.value,
        this.addUpdateForm.controls.purchasePrice.value,
        this.addUpdateForm.controls.currency.value,
        this.addUpdateForm.controls.investmentType.value,
      );
    }

    this.router.navigate(['/']).then()
  }

  getCurrencyLabel(currency: number): string {
    return getCurrencyLabel(currency);
  }

  getInvestmentTypeLabel(investmentType: number): string {
    return getInvestmentTypeLabel(investmentType);
  }
}
