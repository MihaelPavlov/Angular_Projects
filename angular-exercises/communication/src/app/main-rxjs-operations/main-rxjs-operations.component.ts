import {Component} from "@angular/core";
import {filter, map, Observable, of, switchMap, tap} from "rxjs";
import {Pokemon, PokemonInfo} from "../models/pokemon";
import {PokemonService} from "./services/pokemon.service";
import {resultMemoize} from "@ngrx/store";

@Component({
  selector: "main-rxjs-operations",
  templateUrl: "main-rxjs-operations.component.html",
  standalone: true,
})
export class MainRxjsOperationsComponent {
  pokemons!: Observable<Pokemon>

  constructor(private pokemonService: PokemonService) {
  }

  /*
    * Map
    * Description: Apply projection with each value from source.
    ? Method Description:
    ?   Retrieves a list of Pokemon and applies a projection
    ?   to build custom Pokemon objects with additional information.
    ?   @returns An array of custom Pokemon objects, each representing a transformed Pokemon from the source data.
  */
  applyProjection_GetPokemons(): void {
    this.pokemonService.getPokemons(20, 0)
      .pipe(
        map(result => this.buildPokemonObject(result.results))
      ).subscribe((result) => {

      console.log(result)
    });
  }

  /*
    * Filter
    * Description: operator is a filtering operator used to filter items emitted
    *   by the source observable according to the predicate function.
    *   It only emits those values that satisfy a specified predicate.
    ? Method Description:
    ?   Retrieves all forms of Charmander.
    ?   Filters and continues processing only if Charmander forms are present.
    ?   @initializing An array containing all forms of Charmander if available; otherwise, an empty array.
  */
  applyFilter_GetCharmanderTransformations(): void {
    this.pokemonService.getPokemons(20, 0)
      .pipe(
        map(x => x.results.filter(x => x.name === "charmander" || x.name === "charmeleon" || x.name === "charizard")),
        filter(x => x.length > 0),
        map(result => this.buildPokemonObject(result)),
      ).subscribe({
      next: result => {
        console.log(result);
      },
      error: error => {
        console.error(error);
      },
      complete: () => {
        console.log("completed -> ");
      }
    });
  }

  /*
    * Tab
    * Description: Is used to perform side effects for each emission in an observable sequence without modifying the emitted values.
    *   It allows you to execute additional code at various points in the observable pipeline,
    *   such as logging, debugging, or triggering external actions, without altering the data flowing through the observable.
    ? Method Description:
    ?   Logs the results to the console using tap,
  */
  tap_ConsolePokemons(): void {
    this.pokemonService.getPokemons(20, 0)
      .pipe(
        map(x => x.results),
        tap(result => {
          // At all we can perform different logic here.
          console.log(result)
        }),
        // ? Here, tap is used with separate handlers for next, error, and complete events, providing a way to debug the observable pipeline.
        tap({
          next: value => console.log('Next:', value),
          error: err => console.error('Error:', err),
          complete: () => console.log('Complete!')
        })
      ).subscribe();
  }

  /*
    * SwitchMap
    * Description: is used for flattening and mapping the values emitted by one observable into another observable.
    *   It is particularly useful when dealing with asynchronous operations,
    *   such as HTTP requests, and you want to switch to a new observable while discarding the previous one
    ? Method Description:
    ?   This method demonstrates the use of the switchMap operator to efficiently manage
    ?   asynchronous operations when fetching information about a Pokemon. It begins by making a request
    ?   to get a list of Pokemons and extracts the name of the first Pokemon. Then, it utilizes switchMap
    ?   to switch to a new observable, making a subsequent HTTP request to obtain the abilities of the first Pokemon.
   */
  combiningStreamTogether_GetFirstPokemonAbilities() {
    this.pokemonService.getPokemons(1, 0).pipe(
      map(x => x.results.map(x => x.name)),
      switchMap((result) => {
        return this.pokemonService.getAbilitiesByPokemonName(result[0])
      })
    ).subscribe(x => console.log(x));
  }

  private buildPokemonObject(pokemonsFromRequest: Pokemon[]): Pokemon[] {
    let pokemons = [];
    for (const pokemon of pokemonsFromRequest) {
      const pokemonId = pokemon.url.split("/")[6];

      pokemons.push({
        id: (pokemonId as unknown) as number,
        name: pokemon.name,
        url: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`
      });
    }

    return pokemons;
  }
}
