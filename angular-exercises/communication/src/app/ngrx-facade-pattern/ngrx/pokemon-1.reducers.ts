import {createFeature, createReducer, on} from "@ngrx/store";
import {Pokemon} from "../../models/pokemon";
import {pokemonsActions} from "./pokemon-1.actions";

export interface PokemonInitialState {
  pokemons: Pokemon[];
  isLoading: boolean
}

export const initialState: PokemonInitialState = {
  pokemons: [],
  isLoading: false
};

export const pokemonFeature = createFeature({
  name: 'customers',
  reducer: createReducer<PokemonInitialState>(
    initialState,
    on(pokemonsActions.load, (state) => ({...state,isLoading:true})),
    on(pokemonsActions.loaded, (state, {pokemons}) => ({
      ...state,
      pokemons,
      isLoading:false
    })),
  ),
});
