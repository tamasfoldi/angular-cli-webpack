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
import { HeroSearchService } from './hero-search.service';
import { HeroSearchComponent } from './hero-search/hero-search.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { DBModule, DBSchema } from '@ngrx/db';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { useLogMonitor, StoreLogMonitorModule } from '@ngrx/store-log-monitor';
import { HeroEffects } from '../app/effects/hero.effect';
import reducer from './reducers';
import actions from './actions';

const schema: DBSchema = {
  version: 1,
  name: 'heroes_app',
  stores: {
    books: {
      autoIncrement: true,
      primaryKey: 'id'
    }
  }
};


export default schema;

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    routing,
    HttpModule,
    StoreModule.provideStore(reducer),
    StoreDevtoolsModule.instrumentStore({
      maxAge: 5,
      monitor: useLogMonitor({
        position: 'right',
        visible: true
      })
    }),
    StoreLogMonitorModule,
    EffectsModule.run(HeroEffects),
    DBModule.provideDB(schema)
  ],
  declarations: [
    AppComponent,
    HeroSearchComponent,
    routedComponents
  ],
  providers: [
    HeroService,
    actions,
    HeroSearchService,
    { provide: XHRBackend, useClass: InMemoryBackendService }, // in-mem server
    { provide: SEED_DATA, useClass: InMemoryDataService }     // in-mem server data
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

