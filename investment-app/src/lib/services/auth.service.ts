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

  constructor(private restApiService: RestApiService) {
  }

  isAuthenticated(): Promise<boolean> {
    return new Promise<boolean>(
      (resolve, reject) => {
        resolve(this.userSubject$.value != null)
      }
    );
  }

  register(user: IUser): Observable<IUser | null> {
    return this.restApiService.post<IUser>('register', user)
  }

  login(email: string, password: string): Observable<any> {
    return this.restApiService.post('login',{email,password});
  }

  fetchUser(user: IUser): void {
    this.userSubject$.next(user);
  }

  logout(): void {
    this.userSubject$.next(null);
  }
}

