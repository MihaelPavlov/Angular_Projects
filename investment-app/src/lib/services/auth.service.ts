import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {IUser} from "../../app/models/user";
import {RestApiService} from "./rest-api.service";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  private readonly tokenKey = 'aut_jwt_token';
  public tokenExpirationTimer: any;

  constructor(private readonly restApiService: RestApiService) {

  }

  public isAuthenticated(): boolean {
    return !!this.getToken();
  }

  public getTokenKey(): string {
    return this.tokenKey;
  }

  public getUserByToken(tokenData: { token: string, email: string }): Observable<IUser[]> {
    return this.restApiService.get<IUser[]>(`users?email=${tokenData.email}`)
  }

  public register(user: IUser): Observable<AuthResponseData | null> {
    return this.restApiService.post<AuthResponseData>('register', user)
  }

  public login(email: string, password: string): Observable<AuthResponseData | null> {
    return this.restApiService.post<AuthResponseData>('login', {email, password});
  }

  public setToken(token: string, email: string) {
    localStorage.setItem(this.tokenKey, JSON.stringify({token, email}));
  }

  public getToken(): string | null {
    return localStorage.getItem((this.tokenKey))
  }

  public logout(): void {
    localStorage.removeItem(this.tokenKey);

    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
  }
}

export interface AuthResponseData {
  accessToken: string,
  user: IUser
}
