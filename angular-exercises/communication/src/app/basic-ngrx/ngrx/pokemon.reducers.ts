import {Pokemon} from "../../models/pokemon";
import {createReducer, on} from "@ngrx/store";
import {GetAllPokemons, GetAllPokemonsSuccess} from "./pokemon.actions";

const initialState: PokemonInitialState = {
  pokemons: [],
  isLoading: false,
  error: null
}

export interface PokemonInitialState {
  pokemons: Pokemon[];
  isLoading: boolean;
  error: string | null;
}

export const pokemonsListReducer = createReducer(
  initialState,
  on(GetAllPokemonsSuccess, (state, payload) => {
    return {...state, isLoading: false, pokemons: payload.pokemons};
  }),
  on(GetAllPokemons, (state) => {
    return {...state, isLoading: true}
  })
);
