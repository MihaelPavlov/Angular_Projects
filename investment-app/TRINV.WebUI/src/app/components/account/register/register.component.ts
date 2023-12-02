import {Component, OnInit} from "@angular/core";
import {AuthService} from "../../../../shared/services/auth.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: "register",
  templateUrl: 'register.component.html',
  styleUrls: ['register.component.css']
})
export class RegisterComponent implements OnInit{
  constructor(  private activatedRoute: ActivatedRoute,private _authService: AuthService) {
  }
  ngOnInit() {
  }
  public async login(): Promise<void> {
    await this._authService.loginStart()
  }
}
