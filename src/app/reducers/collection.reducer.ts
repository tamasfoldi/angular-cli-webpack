/* tslint:disable:no-switch-case-fall-through */

import '@ngrx/core/add/operator/select';
import 'rxjs/add/operator/map';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { HeroActions } from '../actions/hero.actions';
import { Hero } from '../hero';

export interface CollectionState {
  loaded: boolean;
  loading: boolean;
  ids: number[];
};

const initialState: CollectionState = {
  loaded: false,
  loading: false,
  ids: []
};

export default function (state = initialState, action: Action): CollectionState {
  switch (action.type) {
    case HeroActions.LOAD_COLLECTION: {
      return Object.assign({}, state, {
        loading: true
      });
    }

    case HeroActions.LOAD_COLLECTION_SUCCESS: {
      const HEROES: Hero[] = action.payload;

      return {
        loaded: true,
        loading: false,
        ids: HEROES.map(hero => hero.id)
      };
    }

    case HeroActions.ADD_TO_COLLECTION_SUCCESS:
    case HeroActions.REMOVE_FROM_COLLECTION_FAIL: {
      const HERO: Hero = action.payload;

      if (state.ids.some(id => id === HERO.id)) {
        return state;
      }

      return Object.assign({}, state, {
        ids: [...state.ids, HERO.id]
      });
    }

    case HeroActions.REMOVE_FROM_COLLECTION_SUCCESS:
    case HeroActions.ADD_TO_COLLECTION_FAIL: {
      const HERO: Hero = action.payload;

      return Object.assign({}, state, {
        ids: state.ids.filter(id => id !== HERO.id)
      });
    }

    default: {
      return state;
    }
  }
}


export function getLoaded() {
  return (state$: Observable<CollectionState>) => state$
    .select(s => s.loaded);
}

export function getLoading() {
  return (state$: Observable<CollectionState>) => state$
    .select(s => s.loading);
}

export function getHeroIds() {
  return (state$: Observable<CollectionState>) => state$
    .select(s => s.ids);
}

export function isHeroInCollection(id: number) {
  return (state$: Observable<CollectionState>) => state$
    .let(getHeroIds())
    .map(ids => ids.some(i => i === id));
}
