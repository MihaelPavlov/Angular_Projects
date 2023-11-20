import {Pokemon} from "../../models/pokemon";
import * as pokemonAction from "./pokemon.actions";

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

export function pokemonsListReducer(state: PokemonInitialState = initialState, action: pokemonAction.PokemonsActions): PokemonInitialState {
  switch (action.type) {
    case pokemonAction.GET_ALL_POKEMONS:
      return {
        ...state,
        isLoading: true,
      }
    case pokemonAction.GET_ALL_POKEMONS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        pokemons: [...action.payload.pokemons]
      }
    default:
      return state;
  }
}
