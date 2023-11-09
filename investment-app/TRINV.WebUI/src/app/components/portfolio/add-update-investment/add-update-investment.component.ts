import {Component, Input, OnInit} from "@angular/core";
import {Currency, getCurrencyLabel} from "../../../../enums/currency.enum";
import {getInvestmentTypeLabel, InvestmentType,} from "../../../../enums/investment-type.enum";
import {FormControl, FormGroup} from "@angular/forms";
import {InvestmentService} from "../../../services/investment.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Observable} from "rxjs";
import {AuthService} from "../../../../lib/services/auth.service";
import {IUser} from "../../../models/user";
import {ToastService} from "../../../../lib/services/toast.service";
import {ToastType} from "../../../models/toast";
import {select, Store} from "@ngrx/store";
import {IInvestment} from "../../../models/investment";
import {AddInvestment, GetInvestmentById, UpdateInvestment} from "../portfolio.action";
import {selectInvestment} from "../portfolio.selectors";
import {ICryptoAsset} from "../../../models/cryptoAsset";
import {GetAllCoins} from "../../crypto_assets/crypto-assets.actions";
import {selectCoinList} from "../../crypto_assets/crypto-assets.selectors";
import {selectAuthUser} from "../../../../shared/ngrx/auth/auth.selectors";

@Component({
  selector: "add-update-investment",
  templateUrl: 'add-update-investment.component.html',
  styleUrls: ["add-update-investment.component.css"]
})
export class AddUpdateInvestmentComponent implements OnInit {
  @Input("id") id: number | undefined;
  public user!: IUser | null
  public currencies!: number[];
  public coins!: Observable<ICryptoAsset[]>
  public investmentTypes!: number[];
  public addUpdateForm = new FormGroup({
    investmentName: new FormControl(),
    symbol: new FormControl(),
    quantity: new FormControl(),
    purchasePrice: new FormControl(),
    currency: new FormControl(),
    investmentType: new FormControl(),
  })

  constructor(private investmentService: InvestmentService, private route: ActivatedRoute,
              private router: Router, private authService: AuthService, private toastService: ToastService,
              private store: Store<{ portfolio: { investments: IInvestment[]} , coins:{ coins: ICryptoAsset[]},auth: {auth:IUser}}>) {
  }

  ngOnInit() {
    this.coins = this.store.pipe(select(selectCoinList));
    this.store.dispatch(new GetAllCoins());

    this.currencies = Object.values(Currency).filter(value => typeof value === 'number') as number[];
    this.investmentTypes = Object.values(InvestmentType).filter(value => typeof value === 'number') as number[];

    this.route.paramMap.subscribe(params => {
      let id = params.get('id');
      if (id != null) {
        this.id = Number(id);

        this.store.dispatch(new GetInvestmentById({id: this.id}))
      }
    });

    this.updateModel();

    this.store.pipe(select(selectAuthUser)).subscribe({
      next: response => {
        if (response != null) {
          this.user = response;
        }
      }
    })
  }

  updateModel(): void {
    if (this.id != undefined) {
      this.store.pipe(select(selectInvestment)).subscribe(result => {
        if (result) {
          console.log(result)
          this.addUpdateForm.patchValue(result)
        }
      })
    }
  }

  onSubmit() {
    if (this.id != undefined) {
      this.store.dispatch(new UpdateInvestment({
        investment: {
          id: this.id,
          userId: Number(this.user?.id),
          investmentName: this.addUpdateForm.controls.investmentName.value,
          symbol: this.addUpdateForm.controls.symbol.value,
          quantity: this.addUpdateForm.controls.quantity.value,
          purchasePrice: this.addUpdateForm.controls.purchasePrice.value,
          currency: this.addUpdateForm.controls.currency.value,
          investmentType: this.addUpdateForm.controls.investmentType.value
        }
      }));
    } else {
      this.store.dispatch(new AddInvestment({
        investment: {
          userId: Number(this.user?.id),
          investmentName: this.addUpdateForm.controls.investmentName.value,
          symbol: this.addUpdateForm.controls.symbol.value,
          quantity: this.addUpdateForm.controls.quantity.value,
          purchasePrice: this.addUpdateForm.controls.purchasePrice.value,
          currency: this.addUpdateForm.controls.currency.value,
          investmentType: this.addUpdateForm.controls.investmentType.value
        }
      }));
    }

    this.router.navigate(['/my-investments'])
  }

  getCurrencyLabel(currency: number): string {
    return getCurrencyLabel(currency);
  }

  getInvestmentTypeLabel(investmentType: number): string {
    return getInvestmentTypeLabel(investmentType);
  }
}
