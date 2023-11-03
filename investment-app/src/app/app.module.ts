import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {LoginComponent} from "./components/login/login.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RegisterComponent} from "./components/register/register.component";
import {MatExpansionModule} from "@angular/material/expansion";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  AddUpdateInvestmentComponent
} from "./components/portfolio/add-update-investment/add-update-investment.component";
import {InvestmentListComponent} from "./components/portfolio/investment-list/investment-list.component";
import {CurrencyToSymbolPipe} from "./pipes/currency-to-symbol.pipe";
import {InvestmentTypeToNamePipe} from "./pipes/investment-type-to-name.pipe";
import {MatIconModule} from "@angular/material/icon";
import {InvestmentDetailsComponent} from "./components/portfolio/investment-details/investment-details.component";
import {HttpModule} from "../lib/http/http.module";
import {MatToolbarModule} from "@angular/material/toolbar";
import {ToolBarComponent} from "./components/toolbar/tool-bar.component";
import {NewsListComponent} from "./components/news/news-list/news-list.component";
import {ToastComponent} from "./components/shared/toast/toast.component";
import {TOAST_DEFAULT_OPTIONS} from "./models/toast";
import {
  DetailsPopUpComponent
} from "./components/news/details-pop-up/details-pop-up.component";
import {
  DetailsCommentsPopUpComponent
} from "./components/news/details-comments-pop-up/details-comments-pop-up.component";
import {AppRoutingModule} from "./modules/app-routing.module";
import {AuthGuardService} from "./guards/auth-guard.service";
import {TestComponent} from "./components/test.component";
import {LoadingSpinnerComponent} from "./components/shared/spinner/spinner.component";
import {HomeComponent} from "./components/home/home.component";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {AuthInterceptor} from "./interceptors/auth.interceptor";
import {MatSortModule} from "@angular/material/sort";
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from "@ngrx/store";
import {MatSelectModule} from "@angular/material/select";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatTableModule} from "@angular/material/table";
import {MatButtonModule} from "@angular/material/button";
import {MatMenuModule} from "@angular/material/menu";
import {MatCardModule} from "@angular/material/card";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatDialogModule} from "@angular/material/dialog";
import {MatInputModule} from "@angular/material/input";
import {CommonModule} from "@angular/common";
import {InvestmentEffects} from "./components/portfolio/portfolio.effects";
import {metaReducers, reducers} from "../shared/ngrx/app.reducer";
import {NewsEffects} from "./components/news/news.effects";
import {CoinsComponent} from "./components/crypto_assets/coins/coins.component";
import {FormatNumberPipe} from "./pipes/round-number.pipe";
import {CryptoAssetsEffects} from "./components/crypto_assets/crypto-assets.effects";
import {FormatNumberWithColorPipe} from "./pipes/format-number-with-color.pipe";
import {MatTooltipModule} from "@angular/material/tooltip";
import {DataListService} from "./services/data-list.servie";
import {AuthEffects} from "../shared/ngrx/auth/auth.effects";
import {
  CryptoDoughnutChartComponent
} from "./components/crypto_assets/charts/doughnut-chart/crypto-doughnut-chart.component";
import {ProfileComponent} from "./components/profile/profile.component";
import {DashboardComponent} from "./components/profile/dashboard/dashboard.component";
import {MatTabsModule} from "@angular/material/tabs";
import {GlobalSettingsComponent} from "./components/profile/global-settings/global-settings.component";
import {UserInformationComponent} from "./components/profile/user-information/user-information.component";
import {MatDrawer, MatSidenavModule} from "@angular/material/sidenav";
import {ApiSourcesComponent} from "./components/profile/api-sources/api-sources.component";


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
    FormatNumberWithColorPipe,
    FormatNumberPipe,
    ToolBarComponent,
    NewsListComponent,
    ToastComponent,
    DetailsPopUpComponent,
    DetailsCommentsPopUpComponent,
    TestComponent,
    LoadingSpinnerComponent,
    HomeComponent,
    CoinsComponent,
    CryptoDoughnutChartComponent,
    ProfileComponent,
    DashboardComponent,
    GlobalSettingsComponent,
    UserInformationComponent,
    ApiSourcesComponent,
  ],
  imports: [
    CommonModule,
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
    MatSortModule,
    MatTooltipModule,
    MatTabsModule,
    MatSidenavModule,
    StoreModule.forRoot(reducers, {metaReducers}),
    EffectsModule.forRoot(InvestmentEffects, NewsEffects,CryptoAssetsEffects,AuthEffects)
  ],
  providers: [
    TOAST_DEFAULT_OPTIONS,
    DataListService,
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
