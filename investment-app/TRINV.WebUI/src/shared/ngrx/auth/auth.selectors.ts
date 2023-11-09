import {createFeatureSelector, createSelector} from "@ngrx/store";
import {AuthInitialState} from "./auth.reducer";

export const selectAuthState = createFeatureSelector<AuthInitialState>('auth');
export const selectAuthUser = createSelector(selectAuthState, (state) => state.user)
export const selectAuthIsLoading = createSelector(selectAuthState, (state) => state.isLoading)
export const selectAuthError = createSelector(selectAuthState, (state) => state.error)
