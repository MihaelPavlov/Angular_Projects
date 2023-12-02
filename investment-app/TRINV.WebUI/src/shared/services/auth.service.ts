import {Injectable} from "@angular/core";
import {IUser} from "../../app/models/user";
import {UserManager, User, UserManagerSettings,} from 'oidc-client';
import {Subject} from "rxjs";
import {ActivatedRoute, ActivatedRouteSnapshot} from "@angular/router";
import {PATH} from "../configs/path.configs";
import {IdentityServerConfigs} from "../configs/identity-server.configs";
import {URL_CLIENT} from "../configs/url.configs";
import * as CryptoJS from 'crypto-js';
import {HttpClient, HttpParams} from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  private readonly _userManager!: UserManager;
  private _user: IUser | null = null;
  private _isUserAuthenticated = new Subject<boolean>();
  public isUserAuthenticated = this._isUserAuthenticated.asObservable();

  tokenResponse: any;
  userResponse: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private http: HttpClient
  ) {
    this._userManager = new UserManager(this.idpSettings);

    this.activatedRoute.queryParams.subscribe((params: any) => {
      console.log('tessssssssssssssssssssssssssssssssssssssssssssss', params)
      if (params.code) {
        //this.getAccessToken(params.code, params.state); // uncomment, if you want to do it from UI
        // this.getTokenFromApi(params.code, params.state); // uncomment, if you want just to get token
        this.getCookieFromApi(params.code, params.state);
        // this.callApi()
      }
    });
  }

  public async loginStart(): Promise<void> {
    const state = this.strRandom(40);
    const codeVerifier = this.strRandom(128);
    localStorage.setItem('state', state);
    localStorage.setItem('codeVerifier', codeVerifier);
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

  public loginFinish = (): any => {

    console.log('login finish redirect')
    // return this._userManager.signinRedirectCallback()
    //   .then(user => {
    //     this._user = user;
    //     console.log('user -> ',this._user)
    //     this._loginChangedSubject.next(this.isUserExpired(user));
    //     return user;
    //   })
  }

  getAccessToken(code: string, state: string) {
    if (state !== localStorage.getItem('state')) {
      alert('Invalid callBack state');
      return;
    }

    const codeVerifier = localStorage.getItem('codeVerifier');
    if (!codeVerifier) {
      alert('codeVerifier in localSotage is expected');
      return;
    }

    const payload = new HttpParams()
      .append('grant_type', 'authorization_code')
      .append('code', code)
      .append('code_verifier', codeVerifier)
      .append('redirect_uri', 'http://localhost:4200/sign-in-callback')
      .append('client_id', 'WebClient_ID');

    this.http.post('https://localhost:5001/connect/token', payload, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).subscribe(response => {
      this.tokenResponse = response;
      console.log('from get access token', response)
      this.getUserInfo();
    }, error => {
      console.warn('HTTP Error', error);
    });
  }

  getUserInfo() {
    if (!this.tokenResponse.access_token) {
      alert('accessToken is empty');
      return;
    }

    this.http.get('https://localhost:5001/connect/userinfo', {
      headers: {
        'Authorization': 'Bearer ' + this.tokenResponse.access_token
      }
    }).subscribe(response => {
      this.userResponse = response;
      console.log('from get user info -> ', response)
    }, error => {
      console.warn('HTTP Error', error);
    });
  }

  getCookieFromApi(code: string, state: string) {
    if (state !== localStorage.getItem('state')) {
      alert('Invalid callBack state');
      return;
    }

    const codeVerifier = localStorage.getItem('codeVerifier');
    if (!codeVerifier) {
      alert('codeVerifier in localSotage is expected');
      return;
    }

    this.http.get<any>('https://localhost:7201/api/account/authorize', {
      withCredentials: true,
      headers: {
        'code': code,
        'code_verifier': codeVerifier
      }
    }).subscribe(response => {
      this.userResponse = response;
      this._user = {
        id: response.sub,
        email: response.name
      }
      this._isUserAuthenticated.next(true);
      console.log('cookie from api authrorize -> ', response)
      this.callApi();
    }, error => {
      console.warn('HTTP Error', error);
    });
  }

  callApi() {
    this.http.get<any>('https://localhost:7201/', {
      withCredentials: true,
    }).subscribe(response => {
      this.userResponse = response;
      console.log('response ->', this.userResponse)
    }, error => {
      console.warn('HTTP Error', error);
    });
  }

  private get idpSettings(): UserManagerSettings {
    return {
      authority: IdentityServerConfigs.URL_IDENTITY_SERVER, // Identity Server
      client_id: IdentityServerConfigs.CLIENT_ID, // Main Client
      redirect_uri: `${URL_CLIENT}/${PATH.CLIENT.ACCOUNT.SIGN_IN_CALLBACK}`, // After authentication where we are redirected
      response_type: IdentityServerConfigs.RESPONSE_TYPE,
      scope: IdentityServerConfigs.SCOPE_VARIABLES,
      response_mode: "query",

      post_logout_redirect_uri: `${URL_CLIENT}/${PATH.CLIENT.ACCOUNT.SIGN_OUT_CALLBACK}` // After logout where we are redirected
    }
  }

  public async logoutStart() {
    await this._userManager.signoutRedirect();
  }

  // Called after logoutStart is successfully
  public logoutFinish() {
    this._user = null;
    return this._userManager.signoutRedirectCallback();
  }

  public isAuthenticated = (): boolean => {
    return this._user !== null;
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

export class AuthConstants {
  public static clientRoot = "http://localhost:4200";
  public static idpAuthority = "https://localhost:5001/"
  public static clientId = "WebClient_ID";
}
