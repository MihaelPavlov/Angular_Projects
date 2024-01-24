import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AuthService } from '../../../shared/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { InvestmentType } from 'src/enums/investment-type.enum';

@Component({
  selector: 'tool-bar',
  templateUrl: 'tool-bar.component.html',
  styleUrls: ['tool-bar.component.scss'],
})
export class ToolBarComponent implements OnInit {
  public userAuthenticated = false;

  constructor(
    private authService: AuthService,
    private cdRef: ChangeDetectorRef,
    private router: Router,
    private http: HttpClient
  ) {
    this.authService.isUserAuthenticated$.subscribe((userAuthenticated) => {
      console.log(
        'login changes, -> is user authenticaterd -> ',
        userAuthenticated
      );
      this.userAuthenticated = userAuthenticated;
      this.cdRef.detectChanges();
    });
  }

  ngOnInit() {
    this.authService.isAuthenticated().subscribe((user) => {
      this.userAuthenticated = user;
    });
  }

  redirectToCrypto(): void {
    this.router.navigate(['create', InvestmentType.Crypto]);
  }

  redirectToStock(): void {
    this.router.navigate(['create', InvestmentType.Stock]);
  }
}
