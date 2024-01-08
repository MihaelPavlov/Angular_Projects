import {Injectable} from "@angular/core";
import {BehaviorSubject, map, Observable, Subject} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {PATH} from "../configs/path.configs";
import {IdentityServerConfigs} from "../configs/identity-server.configs";
import {URL_CLIENT} from "../configs/url.configs";
import * as CryptoJS from 'crypto-js';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {PersistenceService} from "./persistance.service";
import {ErrorService} from "./error.service";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  private isUserAuthenticatedSubject$ = new Subject<boolean>();
  public isUserAuthenticated$ = this.isUserAuthenticatedSubject$.asObservable();
  private userInfo$ = new BehaviorSubject<any | null>(null); //TODO: Create model for this userInfo

  private errorsSubject$ = new BehaviorSubject<any[]>([]); //TODO: Create model for this any ErrorModel
  public errors$ = this.errorsSubject$.asObservable();

  private initialExceptionSubject$ = new BehaviorSubject<string>('');
  public initialException$ = this.initialExceptionSubject$.asObservable();
  private readonly state_Key: string = "state";
  private readonly codeVerifier_Key: string = "codeVerifier";
  tokenResponse: any;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private http: HttpClient,
    private persistenceService: PersistenceService,
    private errorService: ErrorService
  ) {
    this.activatedRoute.queryParams.subscribe((params: any) => {
      if (params.code) {
        this.getCookieFromApi(params.code, params.state);
      }
    });
  }

  public register(username: string, email: string, password: string): void {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
      // Add other headers if needed
    });
    this.http.post('https://localhost:7201/user/register', {username, email, password}, {
      withCredentials: true,
      headers
    }).subscribe({
      next: (response: any) => {
        console.log('response from register -> ', response)
        this.errorsSubject$.next(response.errors as any[]);
        this.initialExceptionSubject$.next(response.initialErrorMessage as string);
      },
      error: (error: any) => {
        if (error.error.errors) {

          let result = this.errorService.getErrorsFromValidationAttribute(error.error.errors);

          this.errorsSubject$.next(result);
          this.initialExceptionSubject$.next(error.error.title);
        }
      }
    });
  }

  public loginStart(): void {
    const state = this.strRandom(40);
    const codeVerifier = this.strRandom(128);

    this.persistenceService.setLocalStorageItem(this.state_Key, state);
    this.persistenceService.setLocalStorageItem(this.codeVerifier_Key, codeVerifier);

    // localStorage.setItem('state', state);
    // localStorage.setItem('codeVerifier', codeVerifier);
    const codeVerifierHash = CryptoJS.SHA256(codeVerifier).toString(CryptoJS.enc.Base64);
    const codeChallenge = codeVerifierHash
      .replace(/=/g, '')
      .replace(/\+/g, '-')
      .replace(/\//g, '_');

    const params = [
      'client_id=' + IdentityServerConfigs.CLIENT_ID,
      'redirect_uri=' + encodeURIComponent(`${URL_CLIENT}/${PATH.CLIENT.ACCOUNT.SIGN_IN_CALLBACK}`),
      'response_type=code',
      'scope=' + 'openid profile main_api IdentityServerApi',
      'state=' + state,
      'code_challenge=' + codeChallenge,
      'code_challenge_method=S256',
      'response_mode=query'
    ];
    const encoded = encodeURIComponent('/connect/authorize/callback?' + params.join('&'));

    window.location.href = 'https://localhost:5001/Account/Login' + '?ReturnUrl=' + encoded;
  }

  public getCookieFromApi(code: string, state: string) {
    if (state !== this.persistenceService.getLocalStorageItem(this.state_Key)) {
      alert('Invalid callBack state');
      return;
    }

    const codeVerifier = this.persistenceService.getLocalStorageItem(this.codeVerifier_Key);
    if (!codeVerifier) {
      alert('codeVerifier in localStorage is expected');
      return;
    }

    this.http.get<any>('https://localhost:7201/account/authorize', {
      withCredentials: true,
      headers: {
        'code': code,
        'code_verifier': codeVerifier
      }
    }).subscribe({
      next: (response) => {
        if (response !== null) {
          this.userInfo$.next({id: response.sub, email: response.name})

          this.isUserAuthenticatedSubject$.next(true);

          this.callApi_Test()
          this.router.navigate([PATH.CLIENT.HOME], {replaceUrl: true});
        }

        console.log('cookie from api authrorize -> ', response)
      },
      error: (error) => {
        console.warn('HTTP Error', error);
      }
    });
  }

  // For test purpose
  callApi_Test() {
    this.http.get<any>('https://localhost:7201/', {
      withCredentials: true,
    }).subscribe({
        next: (response) => {
          console.log('response ->', response);
        },
        error: (error) => {
          console.warn('HTTP Error', error);
        }
      }
    );
  }//todo: check the challenge

  public async logoutStart() {
    this.http.get('https://localhost:7201/account/logout', {
      withCredentials: true
    }).subscribe({
      next: (response) => {
        console.log("logout -> ", response)
        this.persistenceService.removeLocalStorageItem(this.state_Key);
        this.persistenceService.removeLocalStorageItem(this.codeVerifier_Key);
        this.userInfo$.next(null);
      },
      error: (error) => {
        console.warn('HTTP Error', error);
      }
    })
  }

  //Todo: check is it's needed
  public isAuthenticated = (): Observable<boolean> => {
    console.log("user ---->", this.userInfo$.value)
    return this.userInfo$.pipe(
      map(user => {
        return !!user;
      })
    );
  }

  public getUserInfo() {
    this.http.get<any>('https://localhost:7201/account/user-info', {
      withCredentials: true
    }).subscribe({
      next: (response) => {
        this.userInfo$.next({id: response.subFromClaim, email: response.email});
      },
      error: (error) => {
        console.warn('HTTP Error', error);
      }
    });
  }

  private strRandom(length: number) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
}
