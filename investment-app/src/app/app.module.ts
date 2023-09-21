import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {LoginComponent} from "./components/login/login.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RegisterComponent} from "./components/register/register.component";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatLegacySelectModule as MatSelectModule} from '@angular/material/legacy-select';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  AddUpdateInvestmentComponent
} from "./components/portfolio/add-update-investment/add-update-investment.component";
import {InvestmentListComponent} from "./components/portfolio/investment-list/investment-list.component";
import {MatLegacyPaginatorModule as MatPaginatorModule} from "@angular/material/legacy-paginator";
import {MatLegacyTableModule as MatTableModule} from "@angular/material/legacy-table";
import {CurrencyToSymbolPipe} from "./pipes/currency-to-symbol.pipe";
import {InvestmentTypeToNamePipe} from "./pipes/investment-type-to-name.pipe";
import {MatLegacyButtonModule as MatButtonModule} from "@angular/material/legacy-button";
import {MatLegacyMenuModule as MatMenuModule} from "@angular/material/legacy-menu";
import {MatIconModule} from "@angular/material/icon";
import {InvestmentDetailsComponent} from "./components/portfolio/investment-details/investment-details.component";
import {MatLegacyCardModule as MatCardModule} from "@angular/material/legacy-card";
import {HttpModule} from "../lib/http/http.module";
import {MatToolbarModule} from "@angular/material/toolbar";
import {ToolBarComponent} from "./components/toolbar/tool-bar.component";
import {NewsListComponent} from "./components/news/news-list/news-list.component";
import {MatLegacySnackBarModule as MatSnackBarModule} from "@angular/material/legacy-snack-bar";
import {ToastComponent} from "./components/shared/toast/toast.component";
import {TOAST_DEFAULT_OPTIONS} from "./models/toast";
import {
  DetailsPopUpComponent
} from "./components/news/details-pop-up/details-pop-up.component";
import {MatLegacyDialogModule as MatDialogModule} from "@angular/material/legacy-dialog";
import {
  DetailsCommentsPopUpComponent
} from "./components/news/details-comments-pop-up/details-comments-pop-up.component";
import {MatLegacyInputModule as MatInputModule} from "@angular/material/legacy-input";
import {AppRoutingModule} from "./modules/app-routing.module";
import {AuthGuardService} from "./guards/auth-guard.service";
import {TestComponent} from "./components/test.component";
import {LoadingSpinnerComponent} from "./components/shared/spinner/spinner.component";
import {HomeComponent} from "./components/home/home.component";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {AuthInterceptor} from "./interceptors/auth.interceptor";
import {MatSortModule} from "@angular/material/sort";

// const routes: Routes = [
//   {path: '', component: InvestmentListComponent},
//   {path: 'create', component: AddUpdateInvestmentComponent},
//   {path: 'update/:id', component: AddUpdateInvestmentComponent},
//   {path: 'investment-details/:id', component: InvestmentDetailsComponent},
//   {path: 'register', component: RegisterComponent},
//   {path: 'login', component: LoginComponent},
// ]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    AddUpdateInvestmentComponent,
    InvestmentListComponent,
    InvestmentDetailsComponent,
    CurrencyToSymbolPipe,
    InvestmentTypeToNamePipe,
    ToolBarComponent,
    NewsListComponent,
    ToastComponent,
    DetailsPopUpComponent,
    DetailsCommentsPopUpComponent,
    TestComponent,
    LoadingSpinnerComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    MatExpansionModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatPaginatorModule,
    MatTableModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatCardModule,
    HttpModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatDialogModule,
    MatInputModule,
    AppRoutingModule,
    MatSortModule
  ],
  providers: [
    TOAST_DEFAULT_OPTIONS,
    AuthGuardService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
