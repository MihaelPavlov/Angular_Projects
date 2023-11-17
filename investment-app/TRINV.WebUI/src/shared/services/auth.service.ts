import {Injectable} from "@angular/core";
import {IUser} from "../../app/models/user";
import {UserManager, User, UserManagerSettings,} from 'oidc-client';
import {Subject} from "rxjs";
import {ActivatedRouteSnapshot} from "@angular/router";
import {PATH} from "../configs/path.configs";
import {IdentityServerConfigs} from "../configs/identity-server.configs";
import {URL_CLIENT} from "../configs/url.configs";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  private readonly _userManager: UserManager;
  private _user!: User | null;
  private _loginChangedSubject = new Subject<boolean>();
  public loginChanged = this._loginChangedSubject.asObservable();

  constructor() {
    this._userManager = new UserManager(this.idpSettings);
  }

  public async loginStart() : Promise<void>{
    await this._userManager.signinRedirect();
  }

  // Called after loginStart is successfully
  public loginFinish = (): Promise<User> => {
    return this._userManager.signinRedirectCallback()
      .then(user => {
        this._user = user;
        console.log('user -> ',this._user)
        this._loginChangedSubject.next(this.isUserExpired(user));
        return user;
      })
  }

  public async logoutStart() {
    await this._userManager.signoutRedirect();
  }

  // Called after logoutStart is successfully
  public logoutFinish() {
    this._user = null;
    return this._userManager.signoutRedirectCallback();
  }

  public isAuthenticated = (): Promise<boolean> => {
    return this._userManager.getUser()
      .then(user => {
        if (this._user !== user) {
          this._loginChangedSubject.next(this.isUserExpired(user));
        }

        this._user = user;
        return this.isUserExpired(user);
      })
  }

  public getAccessToken = (): Promise<string | null> => {
    return this._userManager.getUser()
      .then(user => {
        return !!user && !user.expired ? user.access_token : null;
      })
  }

  private isUserExpired = (user: User | null): boolean => {
    return !!user && !user.expired;
  }

  private get idpSettings(): UserManagerSettings {
    return {
      authority: IdentityServerConfigs.URL_IDENTITY_SERVER, // Identity Server
      client_id: IdentityServerConfigs.CLIENT_ID, // Main Client
      redirect_uri: `${URL_CLIENT}/${PATH.CLIENT.ACCOUNT.SIGN_IN_CALLBACK}`, // After authentication where we are redirected
      scope: IdentityServerConfigs.SCOPE_VARIABLES,
      response_type: IdentityServerConfigs.RESPONSE_TYPE,
      post_logout_redirect_uri: `${URL_CLIENT}/${PATH.CLIENT.ACCOUNT.SIGN_OUT_CALLBACK}` // After logout where we are redirected
    }
  }
}

export class AuthConstants {
  public static clientRoot = "http://localhost:4200";
  public static idpAuthority = "https://localhost:5001/"
  public static clientId = "WebClient_ID";
}
