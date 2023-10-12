import {Component, ElementRef, OnInit, QueryList, ViewChildren} from "@angular/core";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {NotificationService} from "../../services/notification.service";
import {INotification} from "../../models/notification";
import {delay} from "rxjs";
import {IUser} from "../../models/user";
import * as fromAuthReducer from "../../../shared/ngrx/auth/auth.reducer";
import {Store} from "@ngrx/store";
import * as fromAuthActions from "../../../shared/ngrx/auth/auth.actions";


@Component({
  selector: "register",
  templateUrl: 'register.component.html',
  styleUrls: ['register.component.css']
})
export class RegisterComponent implements OnInit {
  @ViewChildren("notifications") notificationsChild: QueryList<ElementRef> | undefined;

  constructor(
    private notificationService: NotificationService,
    private formBuilder: FormBuilder,
    private store: Store<fromAuthReducer.AuthInitialState>) {
  }

  registerForm = new FormGroup({
    username: new FormControl(),
    email: new FormControl(),
    password: new FormControl(),
    confirmPassword: new FormControl(),
    location: new FormGroup({
      city: new FormControl(),
      address: new FormControl(),
      street: new FormControl
    }),
    notifications: new FormGroup({})
  })

  notifications: INotification[] | undefined

  ngOnInit() {
    this.notificationService
      .getNotifications().pipe(delay(1000))
      .subscribe(result => {
        this.notifications = result;

        const notificationsGroup: { [key: string]: FormControl } = {};

        for (const notification of this.notifications) {
          notificationsGroup[notification.name] = this.formBuilder.control(false);
        }

        this.registerForm.controls.notifications.controls = notificationsGroup;
      });
  }

  registerSubmit() {
    let notificaions: INotification[] = [];

    this.notificationsChild?.forEach(element => {
      const name = element.nativeElement.querySelector('input').name;
      const formControl = this.registerForm.get(`notifications.${name}`);

      if (formControl && formControl.value) {
        const id = element.nativeElement.querySelector('input').id;

        let obj: INotification = {
          id,
          name
        }
        notificaions.push(obj);
      }
    })

    const user: IUser = {
      username: this.registerForm.controls.username.value,
      email: this.registerForm.controls.email.value,
      password: this.registerForm.controls.password.value,
      location: {
        city: this.registerForm.controls.location.value.city,
        address: this.registerForm.controls.location.value.address,
        street: this.registerForm.controls.location.value.street
      },
      notifications: notificaions
    };

    this.store.dispatch(new fromAuthActions.Register({user}));
  }
}
