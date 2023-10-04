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
    (state, action) =>{
      console.log('reducer new list', )
    return adapter.addMany(action.news, state)
    } ),

  on(NewsActions.GetCommentsByNewsIdSuccess,
    (state, action) => {
      let news = {...selectAll(state)[action.comments[0].newsId]};
      news.comment = action.comments;

      let updateNews: Update<INews> = {
        id: news.id,
        changes: news,
      }

      console.log('update Comments ->', updateNews)
      return adapter.updateOne(updateNews, {...state, newsById: news})
    })
)
