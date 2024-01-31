import { Injectable } from '@angular/core';
import { RestApiService } from '../../shared/services/rest-api.service';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { IComment } from '../models/comment';
import {
  ExtendedOperationResult,
  OperationResult,
} from '../models/operation-result.model';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class NewsCommentsService {
  private commentsSubject$ = new BehaviorSubject<IComment[]>([]);
  public comments$ = this.commentsSubject$.asObservable();

  constructor(private restApiService: RestApiService) {}

  getCommentsByNewsId(
    newsId: number
  ): Observable<ExtendedOperationResult<IComment[]>> {
    return this.restApiService.get<ExtendedOperationResult<IComment[]>>(
      `/newsComment?newsId=${newsId}`,
      { withCredentials: true }
    );
  }

  getAllComments(): Observable<IComment[]> {
    return this.restApiService.get<IComment[]>('comments');
  }

  createComment(
    newsId: number,
    comment: string
  ): Observable<OperationResult | null> {
    return this.restApiService.post<OperationResult>(
      `/newsComment`,
      {
        newsId,
        comment,
      },
      { withCredentials: true }
    );
  }

  updateComment(
    newsCommentId: number,
    comment: string
  ): Observable<OperationResult | null> {
    return this.restApiService.put<OperationResult>(
      `/newsComment`,
      {
        newsCommentId,
        comment,
      },
      { withCredentials: true }
    );
  }

  deleteComment(id: number): Observable<OperationResult> {
    const options = {withCredentials: true };

    return this.restApiService.delete<OperationResult>(`/newsComment`, {
      ...options,body:{id}
    });
  }
}
