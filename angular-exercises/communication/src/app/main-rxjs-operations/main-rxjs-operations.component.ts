import {Component, DestroyRef, OnDestroy} from "@angular/core";
import {
  BehaviorSubject, catchError,
  combineLatestWith,
  concatMap, debounceTime,
  delay, distinctUntilChanged,
  filter, interval,
  map,
  Observable,
  of, startWith, Subject,
  switchMap, takeUntil,
  tap, throwError,
} from "rxjs";
import {Pokemon} from "../models/pokemon";
import {PokemonService} from "./services/pokemon.service";
import {CommonModule} from "@angular/common";
import {MatSliderModule} from "@angular/material/slider";
import {FormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {Router} from "@angular/router";

@Component({
  selector: "main-rxjs-operations",
  templateUrl: "main-rxjs-operations.component.html",
  styleUrls: ["main-rxjs-operations.component.scss"],
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatSliderModule, CommonModule]
})
export class MainRxjsOperationsComponent {
  selectedFunction: string = 'applyProjection_GetPokemons';
  pokemons!: Observable<Pokemon>

  // * DebounceTime Slider variables
  sliderValue: number = 0;
  private sliderValueChange = new Subject<number>();

  // * DistinctUntilChanged variables
  inputValue: string = '';
  private inputValueSubject = new BehaviorSubject<string>('');
  distinctValue$!: string;
  private otherObservable$ = new Subject<number>();

  constructor(private pokemonService: PokemonService, private router: Router, private destroyRef$: DestroyRef) {
    this.initSlider();
    this.initDistinctUntilChanged();
  }

  //#region map

  /*
    * Map
    * Description: Apply projection with each value from source.
    ? Method Description:
    ?   Retrieves a list of Pokemon and applies a projection
    ?   to build custom Pokemon objects with additional information.
    ?   @returns An array of custom Pokemon objects, each representing a transformed Pokemon from the source data.
  */
  public applyProjection_GetPokemons(): void {
    console.log("-----> map demo start <-----")
    this.pokemonService.getPokemons(20, 0)
      .pipe(
        map(result => this.buildPokemonObject(result.results))
      ).subscribe((result) => {

      console.log(result)
    });
  }

  //#endregion map

  //#region filter

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
    console.log("-----> filter demo start <-----")

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

  //#endregion filter

  //#region tab

  /*
    * Tab
    * Description: Is used to perform side effects for each emission in an observable sequence without modifying the emitted values.
    *   It allows you to execute additional code at various points in the observable pipeline,
    *   such as logging, debugging, or triggering external actions, without altering the data flowing through the observable.
    ? Method Description:
    ?   Logs the results to the console using tap,
  */
  tap_ConsolePokemons(): void {
    console.log("-----> tab demo start <-----")

    this.pokemonService.getPokemons(20, 0)
      .pipe(
        map(x => x.results),
        tap(result => {
          // At all we can perform different logic here.
          console.log('From simple tab -> ', result)
        }),
        // ? Here, tap is used with separate handlers for next, error, and complete events, providing a way to debug the observable pipeline.
        tap({
          next: value => console.log('Next:', value),
          error: err => console.error('Error:', err),
          complete: () => console.log('Complete!')
        })
      ).subscribe();
  }

  //#endregion tab

  //#region switchMap

  /*
    * SwitchMap
    * Description: is used for flattening and mapping the values emitted by one observable into another observable.
    *   It is particularly useful when dealing with asynchronous operations,
    *   such as HTTP requests, and you want to switch to a new observable while discarding the previous one
    ? Method Description:
    ?   This method demonstrates the use of the switchMap operator to efficiently manage
    ?   asynchronous operations when fetching information about a Pokemon. It begins by making a request
    ?   to get a list of Pokemons and extracts the name of the Pokemon. Then, it utilizes switchMap
    ?   to switch to a new observable, making a subsequent HTTP request to obtain the abilities of the Pokemon.
    ! When a new item is emitted by the source observable, switchMap cancels the previous inner observable (if any) and subscribes to the new inner observable.
    ! It switches to the latest inner observable and emits its values.
    ! Basically here we are receiving the abilities only of the last pokemon
    ! NOTICE: That there is a additional logic to simulate the correct behaviour of the switchMap.
   */
  switchStreamTogether_GetPokemonAbilities() {
    console.log("-----> switchMap demo start <-----")

    const fakePokemonService = {
      getPokemons: () => of({results: [{name: 'charmeleon'}, {name: 'bulbasaur'}]}),
    };

    // For the demo instead of using this.pokemonService.getPokemons, we can use the fakePokemonService.getPokemons()
    this.pokemonService.getPokemons(5, 0).pipe(
      map(x => x.results.map(x => x.name)),
      switchMap((result) => {
        return of(...result).pipe(delay(2000),
          switchMap(name => this.pokemonService.getAbilitiesByPokemonName(name))
        );
      })
    ).subscribe(x => console.log(x));
  }

  //#endregion switchMap

  //#region concatMap

  /*
    * ConcatMap
    * Description:
    *   when you want to process the inner observables sequentially,
    *   queuing them up and waiting for the current inner observable to complete before moving on to the next one.
    * In other words:
    *   Projects each source value to an Observable which is merged in the output Observable,
    *   in a serialized fashion waiting for each one to complete before merging the next.
    ? Method Description:
    ?   This method demonstrates the use of the concatMap operator to efficiently manage
    ?   asynchronous operations when fetching information about a Pokemon. It begins by making a request
    ?   to get a list of Pokemons and extracts the name of the Pokemon. Then the concatMap is merging all the values.
    ! When a new item is emitted by the source observable,
    ! concatMap queues up the inner observables and processes them sequentially.
    ! It waits for the current inner observable to complete before subscribing to the next one.
    ! NOTICE: That there is an additional logic to simulate the correct behaviour of the concatMap.
   */
  concatStreamTogether_GetPokemonAbilities() {
    console.log("-----> concatMap demo start <-----")

    this.pokemonService.getPokemons(5, 0).pipe(
      map(x => x.results.map(x => x.name)),
      concatMap((result) => {
        return of(...result).pipe(delay(2000),
          concatMap(name => this.pokemonService.getAbilitiesByPokemonName(name))
        );
      })
    ).subscribe(x => console.log(x));
  }

  //#endregion concatMap

  //#region combineLatestWith

  /*
    * CombineLatestWith
    * Description:
    *   Combines the latest values from multiple observables into an array or an object and emits
    *   the result whenever any of the source observables emits a new value.
    ? Method Description:
    ?   The combineLatestWith_GetPokemons method uses RxJS to fetch Pokemon data
    ?   from three different offsets simultaneously (0, 20, 40).
    ?   It combines the latest values from these requests into an object and logs it to the console.
    ?   The combineLatest operator ensures the emission of a new object whenever any of the three requests produces a new result.
    ?   This approach is useful for fetching and processing data concurrently, though it might lead to redundant requests if caching is not handled properly.
   */
  combineLatestWith_GetPokemons() {
    console.log("-----> combineLatestWith demo start <-----")

    this.pokemonService.getPokemons(20, 0).pipe(
      combineLatestWith(
        this.pokemonService.getPokemons(20, 20),
        this.pokemonService.getPokemons(20, 40)
      ), map(([first, second, third]) => ({first, second, third}))
    ).subscribe((x) => {
      console.log(x)
    });
  }

  //#endregion combineLatestWith

  //#region startWith

  /*
   * StartWith
   * Description:
   *    Is used to emit a specified initial value before the observable begins emitting its regular sequence of values.
   ? Method Description:
   ?    fetch Pokemon names, maps the results, and starts the observable with a fake Pokemon array ('charmeleon', 'bulbasaur')
   ?    before emitting the actual data.
  */
  startWith_EmptyArray_GetPokemons() {
    console.log("-----> startWith demo start <-----")

    const fakePokemonService = {
      getPokemons: () => (['charmeleon', 'bulbasaur']),
    };

    this.pokemonService.getPokemons()
      .pipe(
        map(x => x.results.map(pok => pok.name)),
        startWith(fakePokemonService.getPokemons())
      )
      .subscribe(x => {
        console.log(x)
      });
  }

  //#endregion startWith

  //#region debounceTime

  /*
   * DebounceTime
   * Description:
   *    Is used to control the rate at which a source Observable emits items.
   *    It introduces a delay between the time an item is emitted by the source Observable and the time it reaches the observers.
   ? Method Description:
   ?     Wait for a 1000ms pause in slider value changes before logging the updated value, optimizing for user interaction smoothness.
  */
  initSlider() {
    this.sliderValueChange
      .pipe(
        debounceTime(1000)
      )
      .subscribe((value) => {
        console.log(`Slider value changed: ${value}`);
      });
  }

  onSliderChange(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.sliderValueChange.next(parseInt(value, 10));
  }

  //#endregion debounceTime

  //#region distinctUntilChanged

  /*
     * distinctUntilChanged
     * Description:
     *    Is a useful operator provided by RxJS for filtering out consecutive duplicate values emitted by an Observable.
     *    If you're working with Angular and fetching data using services, you might want to use distinctUntilChanged to prevent unnecessary updates when the data hasn't changed.
     ? Method Description:
     ?    Ensuring that only distinct input values trigger updates
     ?    optimizing for unique values and preventing redundant operations.
  */
  initDistinctUntilChanged() {
    this.inputValueSubject
      .pipe(
        distinctUntilChanged()
      ).subscribe(x => {
      console.log('updating only the new value')
      this.distinctValue$ = x;
    });
  }

  updateValue() {
    this.inputValueSubject.next(this.inputValue);
  }

  //#endregion distinctUntilChanged

  //#region catchError

  /*
   * catchError
   * Description:
   *    It's used to handle errors that may occur in an observable stream.
   ? Method Description:
   ?    Handles and rethrows observable errors.
  */
  catchError_FromObservable() {
    console.log("-----> catchError demo start <-----")

    throwError(() => new Error('Catch me if you can'))
      .pipe(
        catchError((error) => {
          return throwError(error);
        })
      )
      .subscribe({
        next: (result) => {
          console.log('Received result:', result);
        },
        error: (error) => {
          console.error('This will not be called due to catchError');
          console.log('Error Message -> ', error.message)
        }
      });
  }

  //#endregion catchError

  //#region takeUntil

  /*
   * takeUntil
   * Description:
   *     Commonly used to complete an observable stream based on the emissions from another observable.
   *     This is useful in scenarios where you want to stop or complete a stream of events when a certain condition is met.
   ? Method Description:
   ?    An observable (source$) emits values at a 1-second interval. The observable is set to complete when another observable (this.otherObservable) emits.
   ?    After 3 seconds (mocked ngOnDestroy), the subscription is terminated, logging emitted values.
  */
  takeUntil_Init() {
    console.log("-----> takeUntil demo start <-----")

    const source$ = interval(1000);

    // Use takeUntil to complete the observable when the otherObservable$ Subject emits
    source$.pipe(
      takeUntil(this.otherObservable$)
    ).subscribe((val) => {
      console.log(val)
    });

    setTimeout(this.mocked_call.bind(this), 3000);
  }

  mocked_call() {
    console.log("calling the observable from takeUntil")
    // Emit a value to complete the source$ observable when the component is destroyed
    this.otherObservable$.next(1);
    this.otherObservable$.complete();
  }

  //#endregion takeUntil

  //#region takeUntilDestroyed

  /*
    * takeUntilDestroyed
    * Description:
    *     Operator which completes the Observable when
    *     the calling context (component, directive, service, etc) is destroyed.
    ? Method Description:
    ?    The takeUntilDestroyed_Init() method is used to demonstrate the usage
    ?    of the takeUntilDestroyed function. It creates an observable that emits a value every second and subscribes to it. The takeUntilDestroyed function is used to unsubscribe from the observable when the component is destroyed.
    ?    The setTimeout function is used to refresh the page after 3 seconds 1.
  */
  takeUntilDestroyed_Init() {
    console.log("-----> takeUntilDestroyed demo start <-----")

    const source$ = interval(1000);

    source$.pipe(
      takeUntilDestroyed(this.destroyRef$)
    ).subscribe((val) => {
      console.log(val)
    });

    setTimeout(this.refreshPage.bind(this), 3000);
  }

  refreshPage() {
    window.location.href = "http://localhost:4200/";
  }

  //#endregion takeUntilDestroyed

  public executeFunction(): void {
    this.constructor.prototype[this.selectedFunction].bind(this)()
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
