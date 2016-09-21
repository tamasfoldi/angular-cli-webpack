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

import { HeroService, HeroSearchService } from '../services';
import { HeroActions } from '../actions';
import { Hero } from '../interfaces';


@Injectable()
export class HeroEffects {

  constructor(
    private updates$: Actions,
    private heroService: HeroService,
    private heroSearchService: HeroSearchService,
    private heroActions: HeroActions
  ) { }

  @Effect() loadHeroesOnInit$ = Observable.of(this.heroActions.loadHeroes());

  @Effect() loadHeroes$ = this.updates$
    .ofType(HeroActions.LOAD_HEROES)
    .switchMapTo(this.heroService.getHeroes())
    .map((Heros: Hero[]) => this.heroActions.loadHeroesSuccess(Heros));

  @Effect() search$ = this.updates$
    .ofType(HeroActions.SEARCH)
    .map<string>(action => action.payload)
    .filter(query => query !== '')
    .switchMap(query => this.heroSearchService.search(query)
      .map(heroes => this.heroActions.searchComplete(heroes))
      .catch(() => Observable.of(this.heroActions.searchComplete([])))
    );


  @Effect() clearSearch$ = this.updates$
    .ofType(HeroActions.SEARCH)
    .map<string>(action => action.payload)
    .filter(query => query === '')
    .mapTo(this.heroActions.searchComplete([]));


  @Effect() addHero$ = this.updates$
    .ofType(HeroActions.ADD_HERO)
    .map<Hero>(action => action.payload)
    .mergeMap(hero => this.heroService.save(hero)
      .map(h => this.heroActions.addHeroSuccess(h))
      .catch(() => Observable.of(
        this.heroActions.addHeroFail(hero)
      ))
    );

  @Effect() editHero$ = this.updates$
    .ofType(HeroActions.EDIT_HERO)
    .map<Hero>(action => action.payload)
    .mergeMap(hero => this.heroService.save(hero)
      .map(h => this.heroActions.editHeroSuccess(h))
      .catch(() => Observable.of(
        this.heroActions.editHeroFail(hero)
      ))
    );


  @Effect() removeHero$ = this.updates$
    .ofType(HeroActions.REMOVE_HERO)
    .map<Hero>(action => action.payload)
    .mergeMap(hero => this.heroService.delete(hero)
      .mapTo(this.heroActions.removeHeroSuccess(hero))
      .catch(() => Observable.of(
        this.heroActions.removeHeroFail(hero)
      ))
    );
}
