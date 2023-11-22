import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {PokemonService} from "../services/pokemon.service";
import {Pokemon} from "../../models/pokemon";
import {delay, map, switchMap} from "rxjs";
import {pokemonsActions} from "./pokemon-1.actions";

@Injectable()
export class PokemonsEffects_1 {
  getPokemons1$ = createEffect(()=>
    this.actions$.pipe(
      ofType(pokemonsActions.load),
      switchMap(x => {
        return this.pokemonService.getPokemons()
      }),delay(2000),
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

        return pokemonsActions.loaded({pokemons:mappedPokemons});
      }))
  )

  constructor(
    private readonly actions$: Actions,
    private readonly pokemonService: PokemonService) {
  }
}
