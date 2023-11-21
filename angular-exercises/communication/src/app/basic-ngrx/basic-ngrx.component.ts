import {Component, OnInit,} from "@angular/core";
import {HttpClientModule} from "@angular/common/http";
import {CommonModule} from "@angular/common";
import {select, Store, StoreModule} from "@ngrx/store";
import {selectIsLoading, selectPokemonList} from "./ngrx/pokemon.selectors";
import {Observable} from "rxjs";
import {Pokemon} from "../models/pokemon";
import {GetAllPokemons} from "./ngrx/pokemon.actions";
import {PokemonInitialState} from "./ngrx/pokemon.reducers";

@Component({
  selector: "basic-ngrx",
  templateUrl: "basic-ngrx.component.html",
  styleUrls: ["basic-ngrx.component.scss"],
  imports: [CommonModule],
  providers: [Store],
  standalone: true
})
export class BasicNgrxComponent implements OnInit {
  public pokemons!: Observable<Pokemon[]>;
  public isLoading!: Observable<boolean>;

  constructor(private store: Store<PokemonInitialState>) {

  }

  ngOnInit() {
    this.pokemons = this.store.pipe(select(selectPokemonList));
    this.isLoading = this.store.pipe(select(selectIsLoading));

    this.store.dispatch(GetAllPokemons());
  }
}
