import { createAction, props } from '@ngrx/store';
import { INews } from '../../models/news';
import { IComment } from '../../models/comment';
import { OperationResult } from 'src/app/models/operation-result.model';

export const GET_NEWS_LIST = '[News] Get News List';
export const GET_NEWS_LIST_SUCCESS = '[News] Get News List Success';
export const GET_NEWS_BY_ID = '[News] Get News By Id';
export const GET_NEWS_BY_ID_SUCCESS = '[News] Get News By Id Success';
export const GET_COMMENTS_BY_NEWS_ID = '[News] Get Comments By News Id';
export const GET_COMMENTS_BY_NEWS_ID_SUCCESS =
  '[News] Get Comments By News Id Success';
export const GET_COMMENTS_BY_NEWS_ID_ERROR =
  '[News] Get Comments By News Id Error';
export const CREATE_NEWS_COMMENT = '[News] Create News Comment';
export const CREATE_NEWS_COMMENT_SUCCESS = '[News] Create News Comment Success';
export const CREATE_NEWS_COMMENT_ERROR = '[News] Create News Comment Error';
export const DELETE_NEWS_COMMENT = '[News] Delete News Comment';
export const DELETE_NEWS_COMMENT_SUCCESS = '[News] Delete News Comment Success';
export const DELETE_NEWS_COMMENT_ERROR = '[News] Delete News Comment Error';
export const UPDATE_NEWS_COMMENT = '[News] Update News Comment';
export const UPDATE_NEWS_COMMENT_SUCCESS = '[News] Update News Comment Success';
export const UPDATE_NEWS_COMMENT_ERROR = '[News] Update News Comment Error';

export const GetNewsList = createAction(GET_NEWS_LIST);

export const GetNewsListSuccess = createAction(
  GET_NEWS_LIST_SUCCESS,
  props<{ newsList: INews[] }>()
);

export const GetNewsById = createAction(
  GET_NEWS_BY_ID,
  props<{ id: number }>()
);

export const GetNewsByIdSuccess = createAction(
  GET_NEWS_BY_ID_SUCCESS,
  props<{ news: INews }>()
);

export const GetCommentsByNewsId = createAction(
  GET_COMMENTS_BY_NEWS_ID,
  props<{ newsId: number }>()
);

export const GetCommentsByNewsIdSuccess = createAction(
  GET_COMMENTS_BY_NEWS_ID_SUCCESS,
  props<{ comments: IComment[] }>()
);

export const GetCommentsByNewsIdError = createAction(
  GET_COMMENTS_BY_NEWS_ID_ERROR,
  props<{ operationResult: OperationResult | null }>()
);

export const CreateNewsComment = createAction(
  CREATE_NEWS_COMMENT,
  props<{ newsId: number; comment: string }>()
);

export const CreateNewsCommentSuccess = createAction(
  CREATE_NEWS_COMMENT_SUCCESS,
  props<{ newsId: number }>()
);
export const CreateNewsCommentError = createAction(
  CREATE_NEWS_COMMENT_ERROR,
  props<{ operationResult: OperationResult | null }>()
);

export const DeleteNewsComment = createAction(
  DELETE_NEWS_COMMENT,
  props<{ newsId: number, commentId: number; }>()
);

export const DeleteNewsCommentSuccess = createAction(
  DELETE_NEWS_COMMENT_SUCCESS,
  props<{ newsId: number }>()
);

export const DeleteNewsCommentError = createAction(
  DELETE_NEWS_COMMENT_ERROR,
  props<{ operationResult: OperationResult | null }>()
);

export const UpdateNewsComment = createAction(
  UPDATE_NEWS_COMMENT,
  props<{ newsId: number; commentId: number; comment: string }>()
);

export const UpdateNewsCommentSuccess = createAction(
  UPDATE_NEWS_COMMENT_SUCCESS,
  props<{ newsId: number }>()
);
export const UpdateNewsCommentError = createAction(
  UPDATE_NEWS_COMMENT_ERROR,
  props<{ operationResult: OperationResult | null }>()
);
