import {Injectable} from "@angular/core";
import {BehaviorSubject, catchError, map, Observable, take,} from "rxjs";
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

  autoLogin() {
    const token = localStorage.getItem((this.tokenKey))

    if (!token) {
      return;
    }
    let tokenData: { token: string, email: string } = JSON.parse(token);
    this.getUserByToken(tokenData);
  }

  private getUserByToken(tokenData: { token: string, email: string }) {
    this.restApiService.get<IUser[]>(`users?email=${tokenData.email}`).pipe(take(1)).subscribe({
      next: response => {
        if (response != null) {
          this.userSubject$.next(response[0]);
        }
      }
    })
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
    let email = this.userSubject$.value?.email;
    localStorage.setItem(this.tokenKey, JSON.stringify({token, email}));
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
