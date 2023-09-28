import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";

@Injectable()
export class CoinService {
  constructor(private http: HttpClient,) {
  }
  getAllCoins(){
    const headers = new HttpHeaders({
      'Accept-Encoding': 'gzip, deflate', // Accept-Encoding header
      Authorization: 'Bearer e725b786-a1ca-4d38-a702-9194afd0ad7e', // Authorization header with your API key
    });

    // Make the HTTP GET request with the headers
    return this.http.get('api.coincap.io/v2/assets', { headers });
  }
}

// TODO: MADE MODELfor coins
// "data": [
//         {
//             "id": "bitcoin",
//             "rank": "1",
//             "symbol": "BTC",
//             "name": "Bitcoin",
//             "supply": "19489912.0000000000000000",
//             "maxSupply": "21000000.0000000000000000",
//             "marketCapUsd": "514326420585.4762534499263584",
//             "volumeUsd24Hr": "3700888130.7349749809276092",
//             "priceUsd": "26389.3659748425879732",
//             "changePercent24Hr": "0.4751047417785998",
//             "vwap24Hr": "26408.6080765121221471",
//             "explorer": "https://blockchain.info/"
//         },



