import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {LoginComponent} from "./components/login/login.component";
import {RegisterComponent} from "./components/register/register.component";
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
import {SigninRedirectCallbackComponent} from "./components/sign-in-redirect-callback.component";
import {SignoutRedirectCallbackComponent} from "./components/sign-out-redirect-callback.component";
import {UnauthorizedRedirectModalComponent} from "./components/unauthorized-redirect-modal.component";

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
    SigninRedirectCallbackComponent,
    SignoutRedirectCallbackComponent,
    UnauthorizedRedirectModalComponent
  ],
  imports: [
    SharedModule,
    StoreModule.forRoot(reducers, {metaReducers}),
    EffectsModule.forRoot(InvestmentEffects, NewsEffects, CryptoAssetsEffects)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
