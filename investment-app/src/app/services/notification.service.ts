import {Injectable} from "@angular/core";
import {INotification} from "../models/notification";
import {Observable, of} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {RestApiService} from "../../lib/services/rest-api.service";

@Injectable({
  providedIn: "root"
})
export class NotificationService {
  constructor(private restApiService : RestApiService) {

  }

  getNotifications(): Observable<INotification[]> {
    return this.restApiService.get<INotification[]>("notifications")
  }
}
