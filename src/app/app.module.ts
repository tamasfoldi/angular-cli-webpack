import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// Imports for loading & configuring the in-memory web api
import { XHRBackend } from '@angular/http';

import { InMemoryBackendService, SEED_DATA } from 'angular2-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';

import './rxjs-extensions';
import { AppComponent } from './app.component';
import { routing, routedComponents } from './app.routing';
import { HeroService } from './hero.service';
import { Hero } from './hero';
import { HeroSearchService } from './hero-search.service';
import { HeroSearchComponent } from './hero-search/hero-search.component';
import { StoreModule, ActionReducer, Action } from '@ngrx/store';

export const INCREMENT = 'INCREMENT';
export const DECREMENT = 'DECREMENT';
export const RESET = 'RESET';

export const heroReducer: ActionReducer<Hero> = (state = { id: 0, name: 'Test Hero 0'}, action: Action) => {
    switch (action.type) {
        case INCREMENT:
            return { id: 1, name: 'Test Hero 0'};

        case DECREMENT:
            return { id: 0, name: 'Test Hero 0'};

        case RESET:
            return { id: 0, name: 'Test Hero 0'};

        default:
            return state;
    }
};

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    routing,
    HttpModule,
    StoreModule.provideStore({ heroes: heroReducer }, { hero: { id: 0, name: 'Test Hero 0'} })
  ],
  declarations: [
    AppComponent,
    HeroSearchComponent,
    routedComponents
  ],
  providers: [
    HeroService,
    HeroSearchService,
    { provide: XHRBackend, useClass: InMemoryBackendService }, // in-mem server
    { provide: SEED_DATA, useClass: InMemoryDataService }     // in-mem server data
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

