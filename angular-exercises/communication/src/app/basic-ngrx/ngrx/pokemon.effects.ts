import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {GetAllPokemons, GetAllPokemonsSuccess} from "./pokemon.actions";
import {PokemonService} from "../services/pokemon.service";
import {Pokemon} from "../../models/pokemon";
import {delay, map, of, switchMap} from "rxjs";

@Injectable({
  providedIn:"root"
})
export class PokemonsEffects {

  getPokemons$ = createEffect(()=> {
    return this.actions$.pipe(
      ofType(GetAllPokemons),
      switchMap(x => {
        return this.pokemonService.getPokemons()
      }),delay(2000),// Addind this delay to be able to see the loading
      map((pokemons: Pokemon[]) => {
        let mappedPokemons = [];
        for (const pokemon of pokemons) {
          const pokemonId = pokemon.url.split("/")[6];

          mappedPokemons.push({
            id: (pokemonId as unknown) as number,
            name:pokemon.name,
            url:`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`
          });
        }

        return GetAllPokemonsSuccess(mappedPokemons);
      }))
  });

  constructor(
    private readonly actions$: Actions,
    private readonly pokemonService: PokemonService) {
  }
}
