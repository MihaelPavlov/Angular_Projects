import {createFeatureSelector, createSelector} from "@ngrx/store";
import {NewsInitialState, selectAll} from "./new.reducer";

export const selectNewsState = createFeatureSelector<NewsInitialState>('news');
export const selectNewsList = createSelector(selectNewsState, (state)=>selectAll(state))
export const selectNewsById= createSelector(selectNewsState, (state)=>state.newsById)
export const selectNewsIsLoading = createSelector(selectNewsState, (state)=>state.isLoading)
export const selectNewsComments = createSelector(
  selectNewsState,
  (state) => state.comments
);
