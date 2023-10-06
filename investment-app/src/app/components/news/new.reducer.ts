import {INews} from "../../models/news";
import {createEntityAdapter, EntityState, Update} from "@ngrx/entity";
import {createReducer, on} from "@ngrx/store";
import * as NewsActions from "./news.action";

export const adapter = createEntityAdapter<INews>();
export const {selectAll} = adapter.getSelectors();

export interface NewsInitialState extends EntityState<INews> {
  isLoading: boolean,
  error: string | null,
  newsById: INews | null
}

export const initialState: NewsInitialState = adapter.getInitialState({
  isLoading: false,
  error: null,
  newsById: null
});

export const newsListReducer = createReducer(
  initialState,

  on(NewsActions.GetNewsSuccess,
    (state, action) => {
      console.log('reducer new list',)
      return adapter.addMany(action.news, state)
    }),

  on(NewsActions.GetCommentsByNewsIdSuccess,
    (state, action) => {
      let news = {...selectAll(state).find(x => x.id == action.newsId)} as INews;
      news.comments = action.comments;

      let updateNews: Update<INews> = {
        id: news.id,
        changes: news,
      }

      console.log('update Comments ->', updateNews)
      return adapter.updateOne(updateNews, {...state, newsById: news})
    }),

  on(NewsActions.CreateNewsComment,
    (state, action) => {
      return state;
    }),

  on(NewsActions.CreateNewsCommentSuccess,
    (state, action) => {
      let news = {...selectAll(state).find(x => x.id == action.comment.newsId)} as INews;

      news.comments = [...news.comments, action.comment];
      let updateNews: Update<INews> = {
        id: news.id as number,
        changes: news,
      }

      return adapter.updateOne(updateNews, {...state, newsById: news})
    }),

  on(NewsActions.DeleteNewsComment,
    (state, action) => {
      let news = {...selectAll(state).find(x => x.id == action.newsId)} as INews;

      news.comments = news.comments?.filter(x => x.id != action.commentId);
      let updateNews: Update<INews> = {
        id: news.id as number,
        changes: news,
      }

      return adapter.updateOne(updateNews, {...state, newsById: news})
    }),

  on(NewsActions.DeleteNewsCommentSuccess,
    (state, action) => {

      return state;
    }),

  on(NewsActions.UpdateNewsComment,
    (state, action) => {
      return state;
    }),

  on(NewsActions.UpdateNewsCommentSuccess,
    (state, action) => {
      let news = {...selectAll(state).find(x => x.id == action.newsId)} as INews;
      console.log('sss -> ', news.comments)

      news.comments = [...news.comments.map(x => {
        if (x.id == action.comment.id) {
          return action.comment
        }
        return x;
      })]

      let updateNews: Update<INews> = {
        id: news.id as number,
        changes: news,
      }

      return adapter.updateOne(updateNews, {...state, newsById: news})
    }),
)
