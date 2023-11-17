import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {from, Observable} from "rxjs";
import {AuthService} from "../services/auth.service";
import {URL_INVEST_TRACKER} from "../configs/url.configs";

/* check this files in vanguard project
to understand how the authentication in identity server work
* auth.service.ts
* tools.service.ts
* auth.guard.ts
* html.module.ts
* auth.interceptor.ts
*
*
* */
@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.startsWith(URL_INVEST_TRACKER)) {
      return from(
        this.authService.getAccessToken()
          .then(token => {
            const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
            const authRequest = req.clone({headers});
            return next.handle(authRequest).toPromise() as Promise<HttpEvent<any>>;
          })
      );
    } else {
      return next.handle(req);
    }
  }
}





