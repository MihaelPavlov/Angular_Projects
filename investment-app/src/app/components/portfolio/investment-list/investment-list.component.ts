import {AfterViewInit, Component, OnDestroy, OnInit, TemplateRef, ViewChild} from "@angular/core";
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
import * as fromInvestment from "../portfolio.action";
import * as fromInvestmentSelectors from "../portfolio.selectors";
import {distinctUntilChanged, filter, Observable, Subscription, take} from "rxjs";

@Component({
  selector: "investment-list",
  templateUrl: "investment-list.component.html",
  styleUrls: ["investment-list.component.css"]
})
export class InvestmentListComponent implements OnInit, OnDestroy {
  user?: IUser | null
  dataSource!: MatTableDataSource<IInvestment>;
  investments$!: Observable<IInvestment[]>
  isLoading$!: Observable<boolean>
  displayedColumns: string[] = ['investmentName', 'symbol', 'quantity', 'purchasePrice', 'investmentType', 'actions'];
  filterColumns: { id: number, value: string }[] = Object.keys(Fields).map(x => ({
    id: Number(x),
    value: this.getEnumTextByKey(Number(x))
  })).filter(x => x.value !== "")
  labels: string[] = []
  areFilterShown: boolean = false;
  selectedColumn!: string
  filterText!: string
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild("#applyFilter") myFilter!: TemplateRef<any>
  mySub!: Subscription
  filterForm = new FormGroup({
    "filters": new FormArray([]),
    "filtersIds": new FormArray([])
  });

  constructor(private investmentService: InvestmentService, private router: Router,
              private authService: AuthService, private toastService: ToastService,
              private store: Store<{ portfolio: { investments: IInvestment[] } }>) {
    this.authService.user$.subscribe(result => {
      this.user = result;
    })
  }

  ngOnDestroy(): void {
    this.mySub.unsubscribe();
  }

  ngOnInit() {
    this.isLoading$ = this.store.pipe(select(fromInvestmentSelectors.selectInvestmentIsLoading));
    this.investments$ = this.store.pipe(select(fromInvestmentSelectors.selectInvestmentsList));

    this.store.dispatch(new fromInvestment.GetInvestments({userId: Number(this.user?.id)}));

    this.mySub = this.investments$.subscribe(x => {
      this.dataSource = new MatTableDataSource<IInvestment>(x);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  onDelete(investmentId: number): void {
    this.store.dispatch(new fromInvestment.DeleteInvestment({investmentId, userId: Number(this.user?.id)}))
  }

  redirectToDetailsPage(id: number): void {
    this.router.navigate(['investment-details', id]);
  }

  onEdit(id: number): void {
    this.router.navigate(['update', id]);
  }

  showFilters() {
    console.log(this.filterForm.controls.filters)
    this.areFilterShown = !this.areFilterShown;
    console.log('selected column ->', this.selectedColumn)
    console.log('filtered text ->', this.filterText)
  }

  AddInput(column: { id: number, value: string }) {
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

  removeInput(index: number) {
    (<FormArray>this.filterForm.get('filters')).removeAt(index);
    (<FormArray>this.filterForm.get('filtersIds')).removeAt(index);
    this.labels.splice(index, 1);
  }

//TODO: combine filter and filtersIds into one object {id: fromFilterId: value: from filters}
  onSubmitFilters() {
    let filterObj = this.filterForm.controls.filters.controls.filter(x => (x as any).value != "").map((value, index) => ({
      name: this.getEnumValueByKey((this.filterForm.controls.filtersIds.controls[index] as any).value),
      value: (value as any).value,
    }));

    this.store.dispatch(new fromInvestment.FilterInvestment({userId: Number(this.user?.id), filters: filterObj}));

    this.toastService.success({
      message: "Currently the filter is working like (searching for records which contains all the fields)",
      type: ToastType.Success
    })
  }

  getEnumTextByKey(key: number): string {
    switch (key) {
      case Fields.investmentName:
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
      case Fields.investmentName:
        return "investmentName";
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
  investmentName = 0,
  symbol = 1,
  quantity = 2,
  purchasePrice = 3,
  investmentType = 4,
}

