import {Component, OnInit,} from "@angular/core";
import {HttpClientModule} from "@angular/common/http";
import {CommonModule} from "@angular/common";
import {select, Store, StoreModule} from "@ngrx/store";
import {selectPokemonList} from "./ngrx/pokemon.selectors";
import {Observable} from "rxjs";
import {Pokemon} from "../models/pokemon";
import {EffectsModule} from "@ngrx/effects";

@Component({
  selector: "basic-ngrx",
  imports: [CommonModule],
  providers: [Store],
  templateUrl: "basic-ngrx.component.html",
  styleUrls: ["basic-ngrx.component.scss"],
  standalone: true
})
export class BasicNgrxComponent implements OnInit{
  public pokemons!: Observable<Pokemon[]>;

  constructor(private store:Store) {

  }

  ngOnInit() {
    this.pokemons = this.store.pipe(select(selectPokemonList));
    // this.store.dispatch(new GetAllPokemons());
  }
}
