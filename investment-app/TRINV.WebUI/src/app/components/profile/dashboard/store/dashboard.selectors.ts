import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DashboardInitialState } from './dashboard.reducer';

export const selectDashboardState =
  createFeatureSelector<DashboardInitialState>('dashboard');
export const selectDashboardInfo = createSelector(
  selectDashboardState,
  (state) => state.info
);
export const selectIsLoadingInfo = createSelector(
  selectDashboardState,
  (state) => state.isLoadingInfo
);
export const selectIsLoadingInvestmentsInPercents = createSelector(
  selectDashboardState,
  (state) => state.isLoadingInvestmentsInPercents
);
export const selectInvestmentsInPercents = createSelector(
  selectDashboardState,
  (state) => state.investmentsInPercents
);
export const selectIsLoadingInvestmentsPerformanceList = createSelector(
  selectDashboardState,
  (state) => state.isinvestmentPerformanceListLoading
);
export const selectInvestmentsPerformanceList = createSelector(
  selectDashboardState,
  (state) => state.investmentPerformanceList
);
export const selectIsLoadingLastInvestments = createSelector(
  selectDashboardState,
  (state) => state.isLoadingLastInvestments
);
export const selectLastInvestments = createSelector(
  selectDashboardState,
  (state) => state.lastInvestments
);
export const selectError = createSelector(
  selectDashboardState,
  (state) => state.error
);
