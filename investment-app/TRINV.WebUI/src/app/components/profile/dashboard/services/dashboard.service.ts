import { Injectable } from '@angular/core';
import { InvestmentType } from 'src/enums/investment-type.enum';
import { RestApiService } from 'src/shared/services/rest-api.service';
import { IDashboardInvestmentInfo } from '../models/dashboard-investment-info.interace';
import { Observable } from 'rxjs';
import { ExtendedOperationResult } from 'src/app/models/operation-result.model';
import { IDashboardInvestmentsPercent } from '../models/dashboard-investments-in-percents.interface';
import { IDashboardInvestmentPerformance } from '../models/dashboard-investment-performance.interface';
import { IDashboardLastInvestment } from '../models/dashboard-last-investment.interface';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(private restApiService: RestApiService) {}

  getDashboardInvestmentInfo(
    investmentType: InvestmentType
  ): Observable<ExtendedOperationResult<IDashboardInvestmentInfo> | null> {
    return this.restApiService.get<ExtendedOperationResult<IDashboardInvestmentInfo> | null>(
      `/dashboard/get-investments-info?investmentType=${investmentType}`,
      { withCredentials: true }
    );
  }

  getDashboardInvestmentsInPercents(
    investmentType: InvestmentType
  ): Observable<ExtendedOperationResult<
    IDashboardInvestmentsPercent[]
  > | null> {
    return this.restApiService.get<ExtendedOperationResult<
      IDashboardInvestmentsPercent[]
    > | null>(
      `/dashboard/get-investments-in-percent?investmentType=${investmentType}`,
      { withCredentials: true }
    );
  }

  getDashboardInvestmentPerformanceList(
    investmentType: InvestmentType
  ): Observable<ExtendedOperationResult<
    IDashboardInvestmentPerformance[]
  > | null> {
    return this.restApiService.get<ExtendedOperationResult<
      IDashboardInvestmentPerformance[]
    > | null>(
      `/dashboard/get-investment-performance-list?investmentType=${investmentType}`,
      { withCredentials: true }
    );
  }

  getDashboardLastInvestments(
    investmentType: InvestmentType
  ): Observable<ExtendedOperationResult<IDashboardLastInvestment[]> | null> {
    return this.restApiService.get<ExtendedOperationResult<
      IDashboardLastInvestment[]
    > | null>(
      `/dashboard/get-latest-investments?investmentType=${investmentType}`,
      { withCredentials: true }
    );
  }
}
