/* tslint:disable:no-switch-case-fall-through */

import '@ngrx/core/add/operator/select';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';

import { Hero } from '../hero';
import { HeroActions } from '../actions';


export interface SearchState {
  heroes: Hero[];
  loading: boolean;
  query: string;
};

const initialState: SearchState = {
  heroes: [],
  loading: false,
  query: ''
};

export default function(state = initialState, action: Action): SearchState {
  switch (action.type) {
    case HeroActions.SEARCH: {
      const query = action.payload;

      return Object.assign({}, state, {
        query,
        loading: true
      });
    }

    case HeroActions.SEARCH_COMPLETE: {
      const heroes: Hero[] = action.payload;

      return {
        heroes: heroes,
        loading: false,
        query: state.query
      };
    }

    default: {
      return state;
    }
  }
}

export function getHeroes() {
  return (state$: Observable<SearchState>) => state$
    .select(s => s.heroes);
}
