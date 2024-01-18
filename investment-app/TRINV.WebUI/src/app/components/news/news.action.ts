import { createAction, props } from '@ngrx/store';
import { INews } from '../../models/news';
import { IComment } from '../../models/comment';
import { OperationResult } from 'src/app/models/operation-result.model';

export const GET_NEWS = '[News] Get News';
export const GET_NEWS_SUCCESS = '[News] Get News Success';

export const GET_COMMENTS_BY_NEWS_ID = '[News] Get Comments By News Id';
export const GET_COMMENTS_BY_NEWS_ID_SUCCESS =
  '[News] Get Comments By News Id Success';
export const CREATE_NEWS_COMMENT = '[News] Create News Comment';
export const CREATE_NEWS_COMMENT_SUCCESS = '[News] Create News Comment Success';
export const CREATE_NEWS_COMMENT_ERROR = '[News] Create News Comment Error';
export const DELETE_NEWS_COMMENT = '[News] Delete News Comment';
export const DELETE_NEWS_COMMENT_SUCCESS = '[News] Delete News Comment Success';
export const UPDATE_NEWS_COMMENT = '[News] Update News Comment';
export const UPDATE_NEWS_COMMENT_SUCCESS = '[News] Update News Comment Success';
export const UPDATE_NEWS_COMMENT_ERROR = '[News] Update News Comment Error';

export const GetNews = createAction(GET_NEWS);

export const GetNewsSuccess = createAction(
  GET_NEWS_SUCCESS,
  props<{ news: INews[] }>()
);

export const GetCommentsByNewsId = createAction(
  GET_COMMENTS_BY_NEWS_ID,
  props<{ newsId: number }>()
);

export const GetCommentsByNewsIdSuccess = createAction(
  GET_COMMENTS_BY_NEWS_ID_SUCCESS,
  props<{ comments: IComment[]; newsId: number }>()
);

export const CreateNewsComment = createAction(
  CREATE_NEWS_COMMENT,
  props<{ comment: IComment }>()
);

export const CreateNewsCommentSuccess = createAction(
  CREATE_NEWS_COMMENT_SUCCESS,
  props<{ comment: IComment }>()
);
export const CreateNewsCommentError = createAction(
  CREATE_NEWS_COMMENT_ERROR,
  props<{ error: string }>()
);

export const DeleteNewsComment = createAction(
  DELETE_NEWS_COMMENT,
  props<{ commentId: number; newsId: number }>()
);

export const DeleteNewsCommentSuccess = createAction(
  DELETE_NEWS_COMMENT_SUCCESS
);

export const UpdateNewsComment = createAction(
  UPDATE_NEWS_COMMENT,
  props<{ comment: IComment; newsId: number }>()
);

export const UpdateNewsCommentSuccess = createAction(
  UPDATE_NEWS_COMMENT_SUCCESS,
  props<{ comment: IComment; newsId: number }>()
);
export const UpdateNewsCommentError = createAction(
  UPDATE_NEWS_COMMENT_ERROR,
  props<{ error: string }>()
);
