import {Component, OnInit} from "@angular/core";
import {CoinService} from "../../../lib/services/coin.service";
import {ICryptoAsset} from "../../models/cryptoAsset";

@Component({
  selector: "coins",
  templateUrl: "coins.component.html",
  styleUrls: ["coins.component.css"]
})
export class CoinsComponent implements OnInit {
  coins!: ICryptoAsset[]

  constructor(private coinService: CoinService) {
  }
//TODO: Create a PIpe for long numbers
  ngOnInit(): void {
    this.coinService.getAllCoins().subscribe({
      next: response => {
        this.coins = response.data;
        console.log(this.coins)
      }
    })
  }
}
