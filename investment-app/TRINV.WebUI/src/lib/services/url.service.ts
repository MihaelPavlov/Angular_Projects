import {Injectable} from "@angular/core";

@Injectable({
  providedIn:'root'
})
export class UrlService{
  private originUrl = 'https://localhost:7201'

  generateUrl(): string{
   let url =new URL(`${this.originUrl}`);
   return url.href;
  }
}
