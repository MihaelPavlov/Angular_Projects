import {AfterViewInit, Component, OnInit} from "@angular/core";
import {AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {AuthService} from "../../../lib/services/auth.service";
import {Router} from "@angular/router";
import {ToastService} from "../../../lib/services/toast.service";
import {ToastType} from "../../models/toast";
import {select, Store} from "@ngrx/store";
import {AuthInitialState} from "../../../shared/ngrx/auth/auth.reducer";
import {Observable} from "rxjs";
import {selectAuthError, selectAuthIsLoading} from "../../../shared/ngrx/auth/auth.selectors";
import {Login} from "../../../shared/ngrx/auth/auth.actions";

@Component({
  selector: "login",
  templateUrl: "login.component.html",
  styleUrls: ["login.component.css"]
})
export class LoginComponent implements OnInit{
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [this.validatePassword()])
  })
  isLoading: boolean = false;

  constructor(private store: Store<AuthInitialState>, private authService: AuthService, private router: Router, private toastService: ToastService) {
  }
ngOnInit() {
  this.store.pipe(select(selectAuthIsLoading)).subscribe({
    next: response => {
      this.isLoading = response;
    }
  });
}

  loginSubmit() {
    this.store.dispatch(new Login({
      email: String(this.loginForm.controls.email.value),
      password: String(this.loginForm.controls.password.value)
    }));


    // this.authService.login(String(this.loginForm.controls.email.value), String(this.loginForm.controls.password.value)).subscribe({
    //   next: result => {
    //     if (result != null) {
    //       this.authService.fetchUser(result.user);
    //       this.authService.setToken(result.accessToken);
    //       this.authService.autoLogout(3600 * 1000)
    //       this.toastService.success({message: "Successfully Login", type: ToastType.Success})
    //       this.router.navigate(["/"])
    //     } else {
    //       this.toastService.error({message: "Something get wrong", type: ToastType.Error})
    //     }
    //
    //     this.isLoading = false;
    //   },
    //   error: response => {
    //     this.toastService.error({message: `Something get wrong ${response.error}`, type: ToastType.Error})
    //     this.isLoading = false;
    //   }
    // })

  }

  validatePassword()
    :
    ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {

      let password = control.value;
      if (password == '' || password?.length! > 10 || password?.length! < 3) {
        return {isPasswordValid: false};
      }

      return {isPasswordValid: true};
    }
  }
}
