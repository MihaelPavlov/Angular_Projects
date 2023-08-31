import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";
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

  register(user: IUser): void {
    this.restApiService.post('users', user)
    .subscribe( {
      next: response => {
         this.userSubject$.next(response as IUser);
        console.log('Registration Success', response)

        //TODO: show toast message
      },
      error: response => {
        //TODO: show toast message
        console.log('Registration Failed', response)
      }
    })
  }

  login(): void {

  }

  logout(): void {

  }

  isAuthenticated(): Observable<boolean> {
    return new Observable<boolean>();
  }
}

