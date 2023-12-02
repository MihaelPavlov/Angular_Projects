import {AfterViewInit, ChangeDetectorRef, Component, OnInit} from "@angular/core";
import {AuthService} from "../../../shared/services/auth.service";
import {RestApiService} from "../../../shared/services/rest-api.service";
import {HttpClient} from "@angular/common/http";
import {catchError, map, of, tap} from "rxjs";

@Component({
  selector: "tool-bar",
  templateUrl: "tool-bar.component.html",
  styleUrls: ["tool-bar.component.scss"]

})
export class ToolBarComponent implements OnInit, AfterViewInit {
  public userAuthenticated = false;

  constructor(private authService: AuthService, private cdRef: ChangeDetectorRef, private http: HttpClient) {
    this.authService.isUserAuthenticated
      .subscribe(userAuthenticated => {
        console.log('login changes, -> is user authenticaterd -> ', userAuthenticated)
        this.userAuthenticated = userAuthenticated;
        this.cdRef.detectChanges();
      })
  }

  ngOnInit() {
    if (this.authService.isAuthenticated())
      this.userAuthenticated = true;
  }

  testRequest() {
    this.http.get(`https://localhost:7201/`)
      .pipe(
        tap((result: any) => console.log("authenticated result from our resource-> ", result)),
        catchError(error => {
          console.log('error from request -> ', error)
          return of(error)
        }))
      .subscribe(response => {
        console.log('response from request ------->', response)
      });
  }

  ngAfterViewInit() {
  }
}
