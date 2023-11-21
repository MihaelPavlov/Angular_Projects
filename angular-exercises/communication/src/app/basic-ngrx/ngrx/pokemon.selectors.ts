import {createFeatureSelector, createSelector} from "@ngrx/store";
import {PokemonInitialState} from "./pokemon.reducers";

export const selectPokemonState= createFeatureSelector<PokemonInitialState>("pokemons");
export const selectPokemonList = createSelector(selectPokemonState, (state) => state.pokemons);
export const selectIsLoading= createSelector(selectPokemonState, (state) => state.isLoading);
