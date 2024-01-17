import { Injectable } from '@angular/core';
import { RestApiService } from '../../shared/services/rest-api.service';
import { Observable } from 'rxjs';
import { OperationResult } from '../models/operation-result.model';
import { INews } from '../models/news';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  constructor(private restApiService: RestApiService) {}

  getNewsList(): Observable<OperationResult<INews[]>> {
    return this.restApiService.get<OperationResult<INews[]>>('/news');
  }

  getNewsById(id: number): Observable<INews | null> {
    return this.restApiService.get<INews | null>(`/news/${id}`);
  }
}
