import {Component, OnInit} from "@angular/core";
import {HttpClientModule} from "@angular/common/http";
import {CommonModule} from "@angular/common";
import {Pokemon} from "../models/pokemon";
import {PokemonService} from "./services/pokemon.service";
import {Observable} from "rxjs";

@Component({
  selector: "simple-ngrx-card",
  imports: [CommonModule, HttpClientModule],
  providers: [PokemonService],
  templateUrl: "use-of-behavior-subject.component.html",
  styleUrls: ["use-of-behavior-subject.component.scss"],
  standalone: true
})
export class UseOfBehaviorSubjectComponent implements OnInit {
  public pokemons!: Observable<Pokemon[]>;

  constructor(private pokemonService: PokemonService) {
    this.pokemons = this.pokemonService.pokemons
  }

  ngOnInit() {
    this.pokemonService.getPokemons();
  }
}
