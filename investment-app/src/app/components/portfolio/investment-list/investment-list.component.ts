import {Component, OnDestroy, OnInit, TemplateRef, ViewChild} from "@angular/core";
import {IInvestment} from "../../../models/investment";
import {InvestmentService} from "../../../services/investment.service";
import {Router} from "@angular/router";
import {AuthService} from "../../../../lib/services/auth.service";
import {IUser} from "../../../models/user";
import {ToastService} from "../../../../lib/services/toast.service";
import {ToastType} from "../../../models/toast";
import {MatSort} from "@angular/material/sort";
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {select, Store} from "@ngrx/store";
import * as fromPortfolioActions from "../portfolio.action";
import * as fromPortfolioSelectors from "../portfolio.selectors";
import {Observable, Subscription} from "rxjs";
import {AppState} from "../../../../shared/ngrx/app.reducer";
import {DataListService} from "../../../services/data-list.servie";
import {selectAuthUser} from "../../../../shared/ngrx/auth/auth.selectors";

@Component({
  selector: "investment-list",
  templateUrl: "investment-list.component.html",
  styleUrls: ["investment-list.component.css"]
})
export class InvestmentListComponent implements OnInit, OnDestroy {
  user!: IUser | null
  dataSource!: MatTableDataSource<IInvestment>;
  investments$!: Observable<IInvestment[]>
  isLoading$!: Observable<boolean>
  displayedColumns: string[] = ['investmentId', 'symbol', 'quantity', 'purchasePrice', 'investmentType', 'actions'];
  filterColumns: { id: number, value: string }[] = Object.keys(Fields).map(x => ({
    id: Number(x),
    value: this.getEnumTextByKey(Number(x))
  })).filter(x => x.value !== "")
  labels: string[] = []
  areFilterShown: boolean = false;
  selectedColumn!: string
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild("#applyFilter") myFilter!: TemplateRef<any>
  subscriptions: Subscription[] = []
  filterForm = new FormGroup({
    "filters": new FormArray([]),
    "filtersIds": new FormArray([])
  });

  constructor(private dataListService: DataListService<IInvestment>,
              private investmentService: InvestmentService,
              private router: Router,
              private toastService: ToastService,
              private store: Store<AppState>) {
    this.subscriptions.push(this.store.pipe(select(selectAuthUser)).subscribe({
      next: response => {
        if (response != null) {
          this.user = response;
        }
      }
    }));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(x => {
      x.unsubscribe();
    })
  }

  ngOnInit(): void {
    this.isLoading$ = this.store.pipe(select(fromPortfolioSelectors.selectInvestmentIsLoading));
    this.investments$ = this.store.pipe(select(fromPortfolioSelectors.selectInvestmentsList));

    this.store.dispatch(new fromPortfolioActions.GetInvestments({userId: Number(this.user?.id)}));

    this.subscriptions.push(this.investments$.subscribe(x => {
      this.dataSource = this.dataListService.initializeData(x)
        .addSorting(this.sort)
        .addPagination(this.paginator);
    }));
  }

  onDelete(investmentId: number): void {
    this.store.dispatch(new fromPortfolioActions.DeleteInvestment({investmentId, userId: Number(this.user?.id)}))
  }

  redirectToDetailsPage(id: number): void {
    this.router.navigate(['investment-details', id]);
  }

  onEdit(id: number): void {
    this.router.navigate(['update', id]);
  }

  showFilters(): void {
    this.areFilterShown = !this.areFilterShown;
  }

  AddInput(column: { id: number, value: string }): void {
    let filterObj = this.filterForm.controls.filters.controls.map((value, index) => ({
      id: (this.filterForm.controls.filtersIds.controls[index] as any).value,
      value: (value as any).value,
    }));

    const idAlreadyExists = filterObj.some(item => item.id === column.id);
    if (idAlreadyExists) {
      this.toastService.error({message: "This field is already in the filter", type: ToastType.Error});
      return;
    }

    this.labels.push(column.value);

    (<FormArray>this.filterForm.get('filters')).push(new FormControl(null, Validators.required));
    (<FormArray>this.filterForm.get('filtersIds')).push(new FormControl(column.id, Validators.required));
  }

  removeInput(index: number): void {
    (<FormArray>this.filterForm.get('filters')).removeAt(index);
    (<FormArray>this.filterForm.get('filtersIds')).removeAt(index);
    this.labels.splice(index, 1);
  }

  onSubmitFilters(): void {
    let filterObj = this.filterForm.controls.filters.controls
      .filter(x => (x as any).value != "")
      .map((value, index) => ({
        name: this.getEnumValueByKey((this.filterForm.controls.filtersIds.controls[index] as any).value),
        value: (value as any).value,
      }));

    this.store.dispatch(new fromPortfolioActions.FilterInvestment({userId: Number(this.user?.id), filters: filterObj}));

    this.toastService.success({
      message: "Currently the filter is working like (searching for records which contains all the fields)",
      type: ToastType.Success
    })
  }

  getEnumTextByKey(key: number): string {
    switch (key) {
      case Fields.investmentId:
        return "Investment Name";
      case Fields.symbol:
        return "Symbol";
      case Fields.quantity:
        return "Quantity";
      case Fields.purchasePrice:
        return "Purchase Price";
      case Fields.investmentType:
        return "Investment Type";
    }
    return "";
  }

  getEnumValueByKey(key: number): string {
    switch (key) {
      case Fields.investmentId:
        return "investmentId";
      case Fields.symbol:
        return "symbol";
      case Fields.quantity:
        return "quantity";
      case Fields.purchasePrice:
        return "purchasePrice";
      case Fields.investmentType:
        return "investmentType";
    }
    return "";
  }

}

export enum Fields {
  investmentId = 0,
  symbol = 1,
  quantity = 2,
  purchasePrice = 3,
  investmentType = 4,
}

