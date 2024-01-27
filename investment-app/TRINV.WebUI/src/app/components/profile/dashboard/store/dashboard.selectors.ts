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
export const selectError = createSelector(
  selectDashboardState,
  (state) => state.error
);
