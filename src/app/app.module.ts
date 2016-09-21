import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// Imports for loading & configuring the in-memory web api
import { XHRBackend } from '@angular/http';

import { InMemoryBackendService, SEED_DATA } from 'angular2-in-memory-web-api';

import './rxjs-extensions';
import { AppComponent, HeroSearchComponent } from './components';
import { routing, routedComponents } from './app.routing';
import { HeroService, HeroSearchService, InMemoryDataService } from './services';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { useLogMonitor, StoreLogMonitorModule } from '@ngrx/store-log-monitor';
import { HeroEffects } from '../app/effects/hero.effect';
import reducer from './reducers';
import actions from './actions';
import { HeroListComponent } from './components/hero-list/hero-list.component';
import { HeroFormComponent } from './components/hero-form/hero-form.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    routing,
    HttpModule,
    StoreModule.provideStore(reducer),
    StoreDevtoolsModule.instrumentStore({
      monitor: useLogMonitor({
        position: 'right',
        visible: false
      })
    }),
    StoreLogMonitorModule,
    EffectsModule.run(HeroEffects)
  ],
  declarations: [
    AppComponent,
    HeroSearchComponent,
    routedComponents,
    HeroListComponent,
    HeroFormComponent
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

