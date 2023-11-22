import {createActionGroup, emptyProps, props} from "@ngrx/store";
import {Pokemon} from "../../models/pokemon";

export const pokemonsActions = createActionGroup({
  source: 'Customers',
  events: {
    load: emptyProps(),
    loaded: props<{ pokemons: Pokemon[] }>(),
  },
});
