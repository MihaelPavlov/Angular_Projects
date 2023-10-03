import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable, take,} from "rxjs";
import {IUser} from "../../app/models/user";
import {RestApiService} from "./rest-api.service";
import {select, Store} from "@ngrx/store";
import {AuthInitialState} from "../../shared/ngrx/auth/auth.reducer";
import {LoginSuccess} from "../../shared/ngrx/auth/auth.actions";
import {selectAuthUser} from "../../shared/ngrx/auth/auth.selectors";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  private userSubject$ = new BehaviorSubject<IUser | null>(null);
  public user$ = this.userSubject$.asObservable()
  public user! : IUser| null
  private readonly tokenKey = 'aut_jwt_token';
  private tokenExpirationTimer: any;

  constructor(private readonly restApiService: RestApiService,private readonly store:Store<AuthInitialState>) {
    this.store.pipe(select(selectAuthUser)).subscribe({
      next:response=>{
        this.user = response
      }
    })
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
          // this.userSubject$.next(response[0]);
    this.store.dispatch(new LoginSuccess({user:response[0]}));
          // this.autoLogout(3600*1000)
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

  setToken(token: string,email:string) {
    localStorage.setItem(this.tokenKey, JSON.stringify({token, email}));
  }

  getToken(): string | null {
    return localStorage.getItem((this.tokenKey))
  }

  logout(): void {
    this.userSubject$.next(null);
    localStorage.removeItem(this.tokenKey);

    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
  }

  autoLogout(expirationDuration: number): void {
    this.tokenExpirationTimer = setTimeout(() => {
      // this.logout();
    }, expirationDuration)
  }
}

export interface AuthResponseData {
  accessToken: string,
  user: IUser
}
