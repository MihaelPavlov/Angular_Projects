import {Injectable} from "@angular/core";
import {BehaviorSubject, filter, first, from, map, Observable, take, tap,} from "rxjs";
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
      .subscribe({
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

  login(username: string, password: string): void {
    this.restApiService.get<IUser[]>('users')
      .pipe(
        map(users => users.filter(user => user.username === username && user.password === password)),
      ).subscribe({
      next: response => {
        if (response.length != 0){

          console.log('Login ', response)
        }
        else{
          console.log('Failed no user')
        }

      },
      error: response => {
        console.log('error', response)
      },
      complete: () => {
        console.log('completed')
      }
    })
  }

  logout(): void {

  }

  isAuthenticated(): Observable<boolean> {
    return new Observable<boolean>();
  }
}

