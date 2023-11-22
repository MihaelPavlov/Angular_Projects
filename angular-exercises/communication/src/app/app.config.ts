import {ApplicationConfig} from '@angular/core';
import {provideRouter} from '@angular/router';
import {routes} from './app.routes';
import {provideClientHydration} from '@angular/platform-browser';
import {provideState, provideStore} from "@ngrx/store";
import {provideEffects} from "@ngrx/effects";
import {provideHttpClient} from "@angular/common/http";

// App Config use-of-behavior-subject
/*
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient()]
};
*/

// App Config for basic-ngrx
/*
import {PokemonsEffects} from "./basic-ngrx/ngrx/pokemon.effects";
import {pokemonsListReducer} from "./basic-ngrx/ngrx/pokemon.reducers";
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideStore({pokemons: pokemonsListReducer}),
    provideEffects(PokemonsEffects),
    provideHttpClient(),]
};
*/

// App config for ngrx-facade-pattern

import {pokemonFeature} from "./ngrx-facade-pattern/ngrx/pokemon.reducers";
import {PokemonsEffects} from "./ngrx-facade-pattern/ngrx/pokemon.effects";
export const appConfig: ApplicationConfig = {
  providers: [
    provideState(pokemonFeature),
    provideStore(),
    provideRouter(routes),
    provideClientHydration(),
    provideEffects(PokemonsEffects),
    provideHttpClient(),]
};

