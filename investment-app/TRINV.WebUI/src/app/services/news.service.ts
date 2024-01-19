import { Injectable } from '@angular/core';
import { RestApiService } from '../../shared/services/rest-api.service';
import { Observable } from 'rxjs';
import { ExtendedOperationResult } from '../models/operation-result.model';
import { INews } from '../models/news';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  constructor(private restApiService: RestApiService) {}

  getNewsList(): Observable<ExtendedOperationResult<INews[]>> {
    return this.restApiService.get<ExtendedOperationResult<INews[]>>('/news');
  }

  getNewsById(id: number): Observable<INews | null> {
    return this.restApiService.get<INews | null>(`/news/${id}`);
  }
}
