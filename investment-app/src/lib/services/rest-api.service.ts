import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {map, Observable, tap} from "rxjs";
import {UrlService} from "./url.service";

@Injectable({
  providedIn: 'root'
})
export class RestApiService {
  private readonly baseUrl;

  constructor(private http: HttpClient, private urlService: UrlService) {
    this.baseUrl = urlService.generateUrl();
  }

  public get<T>(path: string, options?: object): Observable<T> {
    console.log('From Rest api service', `${this.baseUrl}${path}`);
    return this.http.get<T>(`${this.baseUrl}${path}`, options)
      .pipe(
        map((result: any) => result as T));
  }

  public post<T>(
    path: string,
    body: object | string,
    options?: object
  ): Observable<T | null> {
    console.log(`test`,`${this.baseUrl}${path}`)
    return this.http
      .post<T>(`${this.baseUrl}${path}`, body, options)
      .pipe(map((res: any) => res as T));
  }

  public put<T>(
    path: string,
    body: object | string,
    options?: object
  ): Observable<T | null> {
    return this.http
      .put<T>(`${this.baseUrl}${path}`, body, options)
      .pipe(map((res: any) => res as T));
  }

  public delete<T>(path: string, options?: object): Observable<any> {
    return this.http
      .delete<T>(`${this.baseUrl}${path}`, options)
      .pipe(map((res: any) => res as T))
  }

}
