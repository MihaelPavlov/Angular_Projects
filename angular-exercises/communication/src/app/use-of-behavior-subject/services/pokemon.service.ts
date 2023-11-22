import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Collection, Pokemon} from "../../models/pokemon";
import {BehaviorSubject, map} from "rxjs";

@Injectable({
  providedIn:"root",
})
export class PokemonService {
  private apiUrl: string = "https://pokeapi.co/api/v2/pokemon?limit=151";
  private pokemonsSubject$ = new BehaviorSubject<Pokemon[]>([])
  public pokemons = this.pokemonsSubject$.asObservable()
  constructor(private http: HttpClient) {
  }

  getPokemons() {
     this.http.get<Collection>(`${this.apiUrl}`).pipe(map(result => result.results)).subscribe((result) => {
       let pokemons = [];
       for (const pokemon of result) {
         const pokemonId = pokemon.url.split("/")[6];

         pokemons.push({
           id: (pokemonId as unknown) as number,
           name:pokemon.name,
           url:`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`
         });
       }

       this.pokemonsSubject$.next(pokemons);
     });
  }
}
