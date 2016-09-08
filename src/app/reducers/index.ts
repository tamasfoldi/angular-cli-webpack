import '@ngrx/core/add/operator/select';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/let';
import { Observable } from 'rxjs/Observable';
import { compose } from '@ngrx/core/compose';
import { storeLogger } from 'ngrx-store-logger';
import { storeFreeze } from 'ngrx-store-freeze';
import { combineReducers } from '@ngrx/store';
import searchReducer, * as fromSearch from './search.reducer';
import heroesReducer, * as fromHeroes from './hero.reducer';
import collectionReducer, * as fromCollection from './collection.reducer';

export interface AppState {
  search: fromSearch.SearchState;
  heroes: fromHeroes.HeroesState;
  collection: fromCollection.CollectionState;
}


export default compose(storeFreeze, storeLogger(), combineReducers)({
  search: searchReducer,
  heroes: heroesReducer,
  collection: collectionReducer
});

export function getHeroesState() {
  return (state$: Observable<AppState>) => state$
    .select(s => s.heroes);
}

export function getHeroEntities() {
  return compose(fromHeroes.getHeroEntities(), getHeroesState());
}

export function getHero(id: number) {
  return compose(fromHeroes.getHero(id), getHeroesState());
}

export function hasHero(id: number) {
  return compose(fromHeroes.hasHero(id), getHeroesState());
}

export function getHeroes(heroIds: number[]) {
  return compose(fromHeroes.getHeroes(heroIds), getHeroesState());
}

export function getSearchState() {
  return (state$: Observable<AppState>) => state$
    .select(s => s.search);
}

export function getSearchHeroIds() {
  return compose(fromSearch.getHeroIds(), getSearchState());
}

export function getSearchStatus() {
  return compose(fromSearch.getStatus(), getSearchState());
}

export function getSearchQuery() {
  return compose(fromSearch.getQuery(), getSearchState());
}

export function getSearchResults() {
  return (state$: Observable<AppState>) => state$
    .let(getSearchHeroIds())
    .switchMap(HeroIds => state$.let(getHeroes(HeroIds)));
}



export function getCollectionState() {
  return (state$: Observable<AppState>) => state$
    .select(s => s.collection);
}

export function getCollectionLoaded() {
  return compose(fromCollection.getLoaded(), getCollectionState());
}

export function getCollectionLoading() {
  return compose(fromCollection.getLoading(), getCollectionState());
}

export function getCollectionHeroIds() {
  return compose(fromCollection.getHeroIds(), getCollectionState());
}

export function isHeroInCollection(id: number) {
  return compose(fromCollection.isHeroInCollection(id), getCollectionState());
}

export function getHeroCollection() {
  return (state$: Observable<AppState>) => state$
    .let(getCollectionHeroIds())
    .switchMap(heroIds => state$.let(getHeroes(heroIds)));
}
