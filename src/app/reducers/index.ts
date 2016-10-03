import '@ngrx/core/add/operator/select';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/let';
import { Observable } from 'rxjs/Observable';
import { compose } from '@ngrx/core/compose';
import { storeLogger } from 'ngrx-store-logger';
import { storeFreeze } from 'ngrx-store-freeze';
import { combineReducers } from '@ngrx/store';
import searchReducer, * as fromSearch from './search.reducer';
import heroesReducer, * as fromHeroes from './heroes.reducer';
import heroReducer, * as fromHero from './hero.reducer';
import * as fromRouter from '@ngrx/router-store';

export interface AppState {
  search: fromSearch.SearchState;
  heroes: fromHeroes.HeroesState;
  hero: fromHero.HeroState;
  router: fromRouter.RouterState;
}

export default compose(storeFreeze, storeLogger(), combineReducers)({
  search: searchReducer,
  heroes: heroesReducer,
  hero: heroReducer,
  router: fromRouter.routerReducer
});

export function getHeroesState() {
  return (state$: Observable<AppState>) => state$
    .select(s => s.heroes);
}

export function getAllHeroes() {
  return compose(fromHeroes.getAllHeroes(), getHeroesState());
}

export function getHeroState() {
  return (state$: Observable<AppState>) => state$
    .select(s => s.hero);
}

export function getHero() {
  return compose(fromHero.getHero(), getHeroState());
}

export function getSearchState() {
  return (state$: Observable<AppState>) => state$
    .select(s => s.search);
}

export function getSearchHeroes() {
  return compose(fromSearch.getHeroes(), getSearchState());
}

export function getSearchResults() {
  return (state$: Observable<AppState>) => state$
    .let(getSearchHeroes());
}
