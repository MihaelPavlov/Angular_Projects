import {Action, createAction, props} from "@ngrx/store";
import {INews} from "../../models/news";
import {IComment} from "../../models/comment";
import {Update} from "@ngrx/entity";

export const GET_NEWS = '[News] Get News'
export const GET_NEWS_SUCCESS = '[News] Get News Success'

export const GET_COMMENTS_BY_NEWS_ID = "[News] Get Comments By News Id"
export const GET_COMMENTS_BY_NEWS_ID_SUCCESS = "[News] Get Comments By News Id Success"

export const GetNews = createAction(
  GET_NEWS
)

export const GetNewsSuccess = createAction(
  GET_NEWS_SUCCESS,
  props<{news: INews[]}>()
)

export const GetCommentsByNewsId = createAction(
  GET_COMMENTS_BY_NEWS_ID,
  props<{newsId: number}>()
)

export const GetCommentsByNewsIdSuccess = createAction(
  GET_COMMENTS_BY_NEWS_ID_SUCCESS,
  props<{comments: IComment[]}>()
)
