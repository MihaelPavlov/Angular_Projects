import {inject, Injectable} from "@angular/core";
import {Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {Pokemon} from "../../models/pokemon";
import * as pokemonActions from "../ngrx/pokemon-1.actions";
import {fromPokemons} from "../ngrx/pokemon-1.selectors";

@Injectable({
  providedIn: "root"
})
export class PokemonFacade {
  #store = inject(Store);

  get pokemons$(): Observable<Pokemon[]> {
    return this.#store.select(fromPokemons.selectPokemons);
  }

  get isLoading$():Observable<boolean>{
    return this.#store.select(fromPokemons.selectIsLoading);
  }
  load() {
    this.#store.dispatch(pokemonActions.pokemonsActions.load());
  }
}
