import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {ICryptoAsset} from "../../app/models/cryptoAsset";
import {Observable} from "rxjs";

@Injectable({
  providedIn: "root"
})
export class CoinService {
  private readonly url: string = 'https://api.coincap.io/v2/assets';
  private readonly headers: HttpHeaders = new HttpHeaders({
    'Accept-Encoding': 'gzip, deflate', // Accept-Encoding header
    Authorization: 'e725b786-a1ca-4d38-a702-9194afd0ad7e', // Authorization header with your API key
  });

  constructor(private http: HttpClient) {
  }

  getAllCoins() : Observable<CoinResult> {
    return this.http.get<CoinResult>(this.url, {headers:this.headers});
  }
}

export interface CoinResult{
  data: ICryptoAsset[]
  timestamp: number

}


