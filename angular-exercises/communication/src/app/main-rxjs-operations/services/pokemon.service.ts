import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Collection, Pokemon, PokemonInfo, PokemonInfoAbilities} from "../../models/pokemon";
import {BehaviorSubject, map, Observable} from "rxjs";

@Injectable({
  providedIn:"root",
})
export class PokemonService {
  private apiUrl: string = "https://pokeapi.co/api/v2";
  private pokemonsSubject$ = new BehaviorSubject<Pokemon[]>([])
  public pokemons = this.pokemonsSubject$.asObservable()
  constructor(private http: HttpClient) {
  }

  getPokemons(pokemonsCount: number = 20 , offset: number = 0)  :Observable<Collection> {
    return this.http.get<Collection>(`${this.apiUrl}/pokemon?limit=${pokemonsCount}&offset${offset}`);
  }

  getAbilitiesByPokemonName(pokemonName: string) : Observable<PokemonInfoAbilities[]>{
    return this.http.get<PokemonInfo>(`${this.apiUrl}/pokemon/${pokemonName}`).pipe(map(x=>x.abilities))
  }
}
