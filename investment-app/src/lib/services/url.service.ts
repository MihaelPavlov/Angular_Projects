import {Injectable} from "@angular/core";

@Injectable({
  providedIn:'root'
})
export class UrlService{
  private originUrl = 'http://localhost:3000'

  generateUrl(): string{
   let url =new URL(`${this.originUrl}`);
   return url.href;
  }
}
