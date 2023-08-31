import {Component, OnInit} from "@angular/core";
import {AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";

@Component({
  selector: "login",
  templateUrl: "login.component.html",
  styleUrls: ["login.component.css"]
})
export class LoginComponent {

  loginForm = new FormGroup({
    username: new FormControl('Write your name', [Validators.minLength(2), Validators.maxLength(10)]),
    password: new FormControl('', [this.validatePassword()])
  })

  login() {
    console.log('Login')
  }

  validatePassword(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {

      let password = control.value;
      if (password == '' || password?.length! > 10 || password?.length! < 3) {
        return {isPasswordValid: false};
      }

      return {isPasswordValid: true};
    }
  }
}
