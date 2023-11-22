import {Component, inject} from "@angular/core";
import {Observable} from "rxjs";
import {Pokemon} from "../models/pokemon";
import {CommonModule} from "@angular/common";
import {PokemonFacade} from "./facade/pokemon.facade";

@Component({
  selector: "ngrx-facade-pattern",
  templateUrl: "ngrx-facade-pattern.component.html",
  styleUrls: ["ngrx-facade-pattern.component.scss"],
  imports: [
    CommonModule
  ],
  standalone: true
})
export class NgrxFacadePatternComponent {
  public pokemons!: Observable<Pokemon[]>;
  public isLoading!: Observable<boolean>;

  constructor(private pokemonFacade: PokemonFacade) {
    pokemonFacade.load();
    this.pokemons = pokemonFacade.pokemons$;
    this.isLoading = pokemonFacade.isLoading$;
    console.log(this.pokemons);
  }


}
