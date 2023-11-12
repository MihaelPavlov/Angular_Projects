import {Component} from "@angular/core";
import {AuthService} from "../../../lib/services/auth.service";

@Component({
  selector: "register",
  templateUrl: 'register.component.html',
  styleUrls: ['register.component.css']
})
export class RegisterComponent {
  constructor(private _authService: AuthService) {
  }

  public async login(): Promise<void> {
    await this._authService.loginStart()
  }
}
