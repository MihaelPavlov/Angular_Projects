import {createSelector} from "@ngrx/store";
import {pokemonFeature} from "./pokemon.reducers";
import {Pokemon} from "../../models/pokemon";

const {selectCustomersState, selectPokemons,selectIsLoading} = pokemonFeature;

const selectById = (id: number) =>
  createSelector(selectPokemons, (state: Pokemon[]) =>
    state.find((p) => p.id === id)
  );

export const fromPokemons = {
  selectPokemons,
  selectIsLoading,
  selectById,
};
