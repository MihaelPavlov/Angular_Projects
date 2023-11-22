import {createAction} from "@ngrx/store";
import {Pokemon} from "../../models/pokemon";

export const GET_ALL_POKEMONS = "[Pokemon] Get All"
export const GET_ALL_POKEMONS_SUCCESS = "[Pokemon] Get All Success"

export const GetAllPokemons = createAction(GET_ALL_POKEMONS)
export const GetAllPokemonsSuccess = createAction(GET_ALL_POKEMONS_SUCCESS, (pokemons: Pokemon[]) => ({pokemons}))
