/* tslint:disable:member-ordering */

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/switchMapTo';
import 'rxjs/add/operator/toArray';
import 'rxjs/add/observable/of';
import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { Database } from '@ngrx/db';

import { HeroService } from '../hero.service';
import { HeroSearchService } from '../hero-search.service';
import { HeroActions } from '../actions';
import { Hero } from '../hero';


@Injectable()
export class HeroEffects {

  constructor(
    private updates$: Actions,
    private heroService: HeroService,
    private heroSearchService: HeroSearchService,
    private db: Database,
    private heroActions: HeroActions
  ) { }

  @Effect() openDB$ = this.db.open('Heros_app').filter(() => false);

  @Effect() loadCollectionOnInit$ = Observable.of(this.heroActions.loadCollection());

  @Effect() loadCollection$ = this.updates$
    .ofType(HeroActions.LOAD_COLLECTION)
    .switchMapTo(this.heroService.getHeroes())
    .map((Heros: Hero[]) => this.heroActions.loadCollectionSuccess(Heros));


  @Effect() search$ = this.updates$
    .ofType(HeroActions.SEARCH)
    .map<string>(action => JSON.stringify(action.payload))
    .filter(query => query !== '')
    .switchMap(query => this.heroSearchService.search(query)
      .map(Heros => this.heroActions.searchComplete(Heros))
      .catch(() => Observable.of(this.heroActions.searchComplete([])))
    );


  @Effect() clearSearch$ = this.updates$
    .ofType(HeroActions.SEARCH)
    .map<string>(action => JSON.stringify(action.payload))
    .filter(query => query === '')
    .mapTo(this.heroActions.searchComplete([]));


  @Effect() addHeroToCollection$ = this.updates$
    .ofType(HeroActions.ADD_TO_COLLECTION)
    .map<Hero>(action => action.payload)
    .mergeMap(Hero => this.db.insert('Heros', [ Hero ])
      .mapTo(this.heroActions.addToCollectionSuccess(Hero))
      .catch(() => Observable.of(
        this.heroActions.addToCollectionFail(Hero)
      ))
    );


  @Effect() removeHeroFromCollection$ = this.updates$
    .ofType(HeroActions.REMOVE_FROM_COLLECTION)
    .map<Hero>(action => action.payload)
    .mergeMap(Hero => this.db.executeWrite('Heros', 'delete', [ Hero.id ])
      .mapTo(this.heroActions.removeFromCollectionSuccess(Hero))
      .catch(() => Observable.of(
        this.heroActions.removeFromCollectionFail(Hero)
      ))
    );
}
