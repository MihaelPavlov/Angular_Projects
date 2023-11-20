import {mergeApplicationConfig, ApplicationConfig, importProvidersFrom} from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';
import {ActionReducerMap, MetaReducer, StoreModule} from "@ngrx/store";
import {PokemonInitialState, pokemonsListReducer} from "./basic-ngrx/ngrx/pokemon.reducers";
import {EffectsModule} from "@ngrx/effects";
import {PokemonsEffects} from "./basic-ngrx/ngrx/pokemon.effects";
import {HttpClientModule} from "@angular/common/http";
import {addImports} from "@angular/compiler-cli/src/ngtsc/transform/src/utils";
export interface AppState {
  pokemons: PokemonInitialState;
}

export const reducers: ActionReducerMap<AppState, any> = {
  pokemons: pokemonsListReducer
};
export const metaReducers: MetaReducer<AppState, any>[] = []

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    importProvidersFrom(
      HttpClientModule,
      StoreModule.forRoot(reducers, {metaReducers}),
      EffectsModule.forRoot(PokemonsEffects)
    )
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
