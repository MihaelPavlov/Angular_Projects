import {Injectable} from "@angular/core";
import {BehaviorSubject, map, Observable,} from "rxjs";
import {IUser} from "../../app/models/user";
import {RestApiService} from "./rest-api.service";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  private userSubject$ = new BehaviorSubject<IUser | null>(null);
  public user$ = this.userSubject$.asObservable()
  private readonly tokenKey = 'aut_jwt_token';

  constructor(private restApiService: RestApiService) {
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  register(user: IUser): Observable<AuthResponseData | null> {
    return this.restApiService.post<AuthResponseData>('register', user)
  }

  login(email: string, password: string): Observable<AuthResponseData | null> {
    return this.restApiService.post<AuthResponseData>('login', {email, password});
  }

  fetchUser(user: IUser): void {
    this.userSubject$.next(user);
  }

  setToken(token: string) {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem((this.tokenKey))
  }


  logout(): void {
    this.userSubject$.next(null);
    localStorage.removeItem(this.tokenKey);
  }
  //TODO: Add auto login and logout
}

export interface AuthResponseData {
  accessToken: string,
  user: IUser
}
