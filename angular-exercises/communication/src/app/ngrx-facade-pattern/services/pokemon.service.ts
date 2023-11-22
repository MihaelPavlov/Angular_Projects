import {Injectable} from "@angular/core";
import {map, Observable} from "rxjs";
import {Collection, Pokemon} from "../../models/pokemon";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class PokemonService {
  private apiUrl: string = "https://pokeapi.co/api/v2/pokemon?limit=151";

  constructor(private http: HttpClient) {
  }

  getPokemons(): Observable<Pokemon[]> {
    return this.http.get<Collection>(`${this.apiUrl}`).pipe(map(result => result.results));
  }
}
