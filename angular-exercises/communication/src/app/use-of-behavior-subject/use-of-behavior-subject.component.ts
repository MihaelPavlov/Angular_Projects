import {Component, OnInit} from "@angular/core";
import {CommonModule} from "@angular/common";
import {Pokemon} from "../models/pokemon";
import {PokemonService} from "./services/pokemon.service";
import {Observable} from "rxjs";

@Component({
  selector: "use-of-behavior-subject",
  imports: [CommonModule],
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
