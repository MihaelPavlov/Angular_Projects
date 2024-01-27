import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {LoginComponent} from "./components/account/login/login.component";
import {RegisterComponent} from "./components/account/register/register.component";
import {
  AddUpdateInvestmentComponent
} from "./components/portfolio/add-update-investment/add-update-investment.component";
import {InvestmentListComponent} from "./components/portfolio/investment-list/investment-list.component";
import {InvestmentDetailsComponent} from "./components/portfolio/investment-details/investment-details.component";
import {ToolBarComponent} from "./components/toolbar/tool-bar.component";
import {NewsListComponent} from "./components/news/news-list/news-list.component";
import {
  DetailsPopUpComponent
} from "./components/news/details-pop-up/details-pop-up.component";
import {
  DetailsCommentsPopUpComponent
} from "./components/news/details-comments-pop-up/details-comments-pop-up.component";
import {TestComponent} from "./components/test.component";
import {HomeComponent} from "./components/home/home.component";
import {EffectsModule} from '@ngrx/effects';
import {InvestmentEffects} from "./components/portfolio/portfolio.effects";
import {NewsEffects} from "./components/news/news.effects";
import {CoinsComponent} from "./components/crypto_assets/coins/coins.component";
import {CryptoAssetsEffects} from "./components/crypto_assets/crypto-assets.effects";
import {
  CryptoDoughnutChartComponent
} from "./components/crypto_assets/charts/doughnut-chart/crypto-doughnut-chart.component";
import {ProfileComponent} from "./components/profile/profile.component";
import {DashboardComponent} from "./components/profile/dashboard/dashboard.component";
import {GlobalSettingsComponent} from "./components/profile/global-settings/global-settings.component";
import {UserInformationComponent} from "./components/profile/user-information/user-information.component";
import {ApiSourcesComponent} from "./components/profile/api-sources/api-sources.component";
import {WatchlistComponent} from "./components/profile/watchlist/watchlist.component";
import {
  NotificationSettingsComponent
} from "./components/profile/notification-settings/notification-settings.component";
import {SharedModule} from "./modules/shared/shared.module";
import {StoreModule} from "@ngrx/store";
import {metaReducers, reducers} from "../shared/ngrx/app.reducer";
import {
  SignInRedirectCallbackComponent
} from "./components/account/sign-in-callback/sign-in-redirect-callback.component";
import {
  SignOutRedirectCallbackComponent
} from "./components/sign-out-redirect-callback.component";
import {UnauthorizedRedirectModalComponent} from "./components/unauthorized-redirect-modal.component";
import {HistoryLogComponent} from "./components/shared/history-log/history-log.component";
import {ErrorsComponent} from "./components/shared/errors/errors.component";
import {AppLabelComponent} from "./components/shared/app-label/app-label.component";
import { PaginationComponent } from './components/news/news-list/test-pagination/pagination.component';
import { NewsPanelComponent } from './components/profile/admin-news-panel/news-panel.component';
import { StocksAssetsEffects } from './components/stock_asset/stock_asset.effects';
import { CommonInvestmentSelector } from './components/portfolio/add-update-investment/common-investment-selector/common-investment-selector';
import { DashboardEffect } from './components/profile/dashboard/store/dashboard.effects';
import { DashboardInfoComponent } from './components/profile/dashboard/dashboard-info/dashboard-info.component';
import { DashboardChartComponent } from './components/profile/dashboard/dashboard-sum-price-chart/dashboard-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    AddUpdateInvestmentComponent,
    InvestmentListComponent,
    InvestmentDetailsComponent,
    ToolBarComponent,
    NewsListComponent,
    DetailsPopUpComponent,
    DetailsCommentsPopUpComponent,
    TestComponent,
    HomeComponent,
    CoinsComponent,
    CryptoDoughnutChartComponent,
    ProfileComponent,
    DashboardComponent,
    GlobalSettingsComponent,
    UserInformationComponent,
    ApiSourcesComponent,
    WatchlistComponent,
    NotificationSettingsComponent,
    SignInRedirectCallbackComponent,
    SignOutRedirectCallbackComponent,
    UnauthorizedRedirectModalComponent,
    HistoryLogComponent,
    ErrorsComponent,
    AppLabelComponent,
    PaginationComponent,
    NewsPanelComponent,
    CommonInvestmentSelector,
    DashboardInfoComponent,
    DashboardChartComponent,
  ],
  imports: [
    SharedModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot(
      InvestmentEffects,
      NewsEffects,
      CryptoAssetsEffects,
      StocksAssetsEffects,
      DashboardEffect
    ),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
