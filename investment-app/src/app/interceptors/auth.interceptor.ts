import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {AuthService} from "../../lib/services/auth.service";

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
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.getToken();

    if (token != null) {
      const authReq = req.clone({
        headers: req.headers.set('Authorization', token)
      });

      return next.handle((authReq));
    } else {
      return next.handle(req);
    }
  }
}





