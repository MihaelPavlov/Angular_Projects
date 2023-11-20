import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import * as pokemonActions from "./pokemon.actions";
import {PokemonService} from "../services/pokemon.service";
import {Pokemon} from "../../models/pokemon";
import {map, of, switchMap} from "rxjs";

@Injectable({
  providedIn:"root"
})
export class PokemonsEffects {

  getPokemons$ = createEffect(()=> {
    return this.actions$.pipe(
      ofType(pokemonActions.GET_ALL_POKEMONS),
      switchMap((data: pokemonActions.GetAllPokemons) => {
        return this.pokemonService.getPokemons()
      })),
      map((pokemons: Pokemon[]) => {
        return new pokemonActions.GetAllPokemonsSuccess({pokemons});
      })
  });

  constructor(
    private readonly actions$: Actions,
    private readonly pokemonService: PokemonService) {
  }
}
