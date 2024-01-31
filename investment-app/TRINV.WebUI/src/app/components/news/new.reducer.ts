import { INews } from '../../models/news';
import { createEntityAdapter, EntityState, Update } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import * as NewsActions from './news.action';
import { IComment } from 'src/app/models/comment';
import { OperationResult } from 'src/app/models/operation-result.model';

export const adapter = createEntityAdapter<INews>();
export const { selectAll } = adapter.getSelectors();

export interface NewsInitialState extends EntityState<INews> {
  isLoading: boolean;
  error: OperationResult | null;
  newsById: INews | null;
  comments: IComment[];
}

export const initialState: NewsInitialState = adapter.getInitialState({
  isLoading: false,
  error: null,
  newsById: null,
  comments: [],
});

export const newsListReducer = createReducer(
  initialState,

  on(NewsActions.GetNewsListSuccess, (state, action) => {
    return adapter.addMany(action.newsList, state);
  }),

  on(NewsActions.GetNewsByIdSuccess, (state, action) => {
    return { ...state, newsById: action.news };
  }),

  on(NewsActions.GetCommentsByNewsIdSuccess, (state, action) => {
    return { ...state, comments: action.comments };
  }),

  on(NewsActions.GetCommentsByNewsIdError, (state, action) => {
    return { ...state, error: action.operationResult };
  }),

  on(NewsActions.CreateNewsComment, (state, action) => {
    return { ...state };
  }),

  on(NewsActions.CreateNewsCommentSuccess, (state, action) => {
    return { ...state };
  }),

  on(NewsActions.CreateNewsCommentError, (state, action) => {
    return { ...state, error: action.operationResult };
  }),

  on(NewsActions.DeleteNewsCommentError, (state, action) => {
    return { ...state, error: action.operationResult };
  }),

  on(NewsActions.DeleteNewsCommentSuccess, (state, action) => {
    return {...state};
  }),

  on(NewsActions.UpdateNewsComment, (state, action) => {
    return {...state};
  }),

  on(NewsActions.UpdateNewsCommentSuccess, (state, action) => {
    return {...state};
  }),

  on(NewsActions.UpdateNewsCommentError, (state, action) => {
    return { ...state, error: action.operationResult };
  })
);
