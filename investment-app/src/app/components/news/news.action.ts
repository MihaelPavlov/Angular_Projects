import {Action, createAction, props} from "@ngrx/store";
import {INews} from "../../models/news";

export const GET_NEWS = '[News] Get News'
export const GET_NEWS_SUCCESS = '[News] Get News Success'

export const GetNews = createAction(
  GET_NEWS
)

export const GetNewsSuccess = createAction(
  GET_NEWS_SUCCESS,
  props<{news: INews[]}>()
)
