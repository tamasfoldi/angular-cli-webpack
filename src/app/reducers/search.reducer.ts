/* tslint:disable:no-switch-case-fall-through */

import '@ngrx/core/add/operator/select';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';

import { Hero } from '../hero';
import { HeroActions } from '../actions';


export interface SearchState {
  ids: number[];
  loading: boolean;
  query: string;
};

const initialState: SearchState = {
  ids: [],
  loading: false,
  query: ''
};

export default function(state = initialState, action: Action): SearchState {
  switch (action.type) {
    case HeroActions.SEARCH: {
      const QUERY = action.payload;

      return Object.assign({}, state, {
        QUERY,
        loading: true
      });
    }

    case HeroActions.SEARCH_COMPLETE: {
      const HEROES: Hero[] = action.payload;

      return {
        ids: HEROES.map(Hero => Hero.id),
        loading: false,
        query: state.query
      };
    }

    default: {
      return state;
    }
  }
}

export function getStatus() {
  return (state$: Observable<SearchState>) => state$
    .select(s => s.loading);
}

export function getHeroIds() {
  return (state$: Observable<SearchState>) => state$
    .select(s => s.ids);
}

export function getQuery() {
  return (state$: Observable<SearchState>) => state$
    .select(s => s.query);
}
