import {INews} from "../../models/news";
import {createEntityAdapter, EntityState} from "@ngrx/entity";
import {createReducer, on} from "@ngrx/store";
import * as NewsActions from "./news.action";

export const adapter = createEntityAdapter<INews>();

export interface NewsInitialState extends EntityState<INews> {
  isLoading: boolean,
  error: string | null
}

export const initialState: NewsInitialState = adapter.getInitialState({
  isLoading: false,
  error: null
});

export const newsListReducer = createReducer(
  initialState,

  on(NewsActions.GetNewsSuccess,
    (state, action) => adapter.addMany(action.news, state))
)
