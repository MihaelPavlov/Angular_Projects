import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {ICryptoAsset} from "../../app/models/cryptoAsset";

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

  getAllCoins() {
    return this.http.get<allCoins>(this.url, {headers:this.headers});
  }
}

export interface allCoins{
  data: ICryptoAsset[]
  timestamp: number

}


