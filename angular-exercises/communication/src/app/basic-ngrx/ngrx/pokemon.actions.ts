import {Action} from "@ngrx/store";
import {Pokemon} from "../../models/pokemon";

export const GET_ALL_POKEMONS = "[Pokemon] Get All"
export const GET_ALL_POKEMONS_SUCCESS = "[Pokemon] Get All Success"

export class GetAllPokemons implements Action {
  readonly type = GET_ALL_POKEMONS;
}

export class GetAllPokemonsSuccess implements Action {
  readonly type = GET_ALL_POKEMONS_SUCCESS;

  constructor(public payload: { pokemons: Pokemon[] }) {
  }
}

export type PokemonsActions =
  GetAllPokemons
  | GetAllPokemonsSuccess
