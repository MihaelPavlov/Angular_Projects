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
import {AuthService} from "../../../../lib/services/auth.service";
import {IUser} from "../../../models/user";


@Component({
  selector: "add-update-investment",
  templateUrl: 'add-update-investment.component.html',
  styleUrls: ["add-update-investment.component.css"]
})
export class AddUpdateInvestmentComponent implements OnInit {
  @Input("id") id: number | undefined;
  public user?: IUser | null
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

  constructor(private investmentService: InvestmentService, private route: ActivatedRoute, private router: Router, private authService: AuthService) {
  }

  ngOnInit() {
    this.authService.user$.subscribe(result => {
      this.user = result;
    })

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
    console.log('Onsubmit register')
    if (this.id != undefined) {
      this.investmentService.update({
        id: this.id,
        userId: Number(this.user?.id),
        investmentName: this.addUpdateForm.controls.investmentName.value,
        symbol: this.addUpdateForm.controls.symbol.value,
        quantity: this.addUpdateForm.controls.quantity.value,
        purchasePrice: this.addUpdateForm.controls.purchasePrice.value,
        currency: this.addUpdateForm.controls.currency.value,
        investmentType: this.addUpdateForm.controls.investmentType.value
      })
      ;

    } else {
      this.investmentService.create({
          userId: Number(this.user?.id),
          investmentName: this.addUpdateForm.controls.investmentName.value,
          symbol: this.addUpdateForm.controls.symbol.value,
          quantity: this.addUpdateForm.controls.quantity.value,
          purchasePrice: this.addUpdateForm.controls.purchasePrice.value,
          currency: this.addUpdateForm.controls.currency.value,
          investmentType: this.addUpdateForm.controls.investmentType.value
        }
      );
    }

    this.router.navigate(['/'])
  }

  getCurrencyLabel(currency: number): string {
    return getCurrencyLabel(currency);
  }

  getInvestmentTypeLabel(investmentType: number): string {
    return getInvestmentTypeLabel(investmentType);
  }
}
