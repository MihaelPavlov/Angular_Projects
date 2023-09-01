import {ILocation} from "./location";
import {INotification} from "./notification";

export interface IUser{
  id: number
  username: string
  password: string
  location: ILocation
  notifications : INotification[]
}
