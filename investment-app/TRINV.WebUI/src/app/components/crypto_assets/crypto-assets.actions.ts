import {Action} from "@ngrx/store";
import { IDigitalCurrency } from "src/app/models/digital-currency";

export const GET_ALL_COINS = "[Crypto-Assets] Get All Coins"
export const GET_ALL_COINS_SUCCESS = "[Crypto-Assets] Get All Coins Success"

export class GetAllCoins implements Action {
  type = GET_ALL_COINS;
}

export class GetAllCoinsSuccess implements Action {
  type = GET_ALL_COINS_SUCCESS;

  constructor(public payload: { coins: IDigitalCurrency[] }) {}
}

export type CoinsActions=
  GetAllCoinsSuccess;
