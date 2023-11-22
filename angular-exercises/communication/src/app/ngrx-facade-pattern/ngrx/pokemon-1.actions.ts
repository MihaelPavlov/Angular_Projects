import {createAction, createActionGroup, emptyProps, props} from "@ngrx/store";
import {Pokemon} from "../../models/pokemon";

// export const GET_ALL_POKEMONS = "[Pokemon] Get All 1"
// export const GET_ALL_POKEMONS_SUCCESS = "[Pokemon] Get All Success 1"
//
// export const GetAllPokemons = createAction(GET_ALL_POKEMONS)
// export const GetAllPokemonsSuccess = createAction(GET_ALL_POKEMONS_SUCCESS, (pokemons: Pokemon[]) => ({pokemons}))
export const pokemonsActions = createActionGroup({
  source: 'Customers',
  events: {
    load : emptyProps(),
    loaded: props<{ pokemons: Pokemon[] }>(),

  },
});
