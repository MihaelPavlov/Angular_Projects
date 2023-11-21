import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import {provideStore} from "@ngrx/store";
import {pokemonsListReducer} from "./basic-ngrx/ngrx/pokemon.reducers";
import {provideEffects} from "@ngrx/effects";
import {PokemonsEffects} from "./basic-ngrx/ngrx/pokemon.effects";
import {provideHttpClient} from "@angular/common/http";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideStore({pokemons: pokemonsListReducer}),
    provideEffects(PokemonsEffects),
    provideHttpClient(),]
};
