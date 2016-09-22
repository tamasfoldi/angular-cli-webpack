/* tslint:disable:no-switch-case-fall-through */

import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Rx';
import { Hero } from '../interfaces/hero';
import { HeroActions } from '../actions/hero.actions';


export type HeroState = Hero;

const initialState: HeroState = {id: null, name: ''};

export default function (state = initialState, action: Action): HeroState {
  switch (action.type) {
    case HeroActions.LOAD_HERO_SUCCESS: {
      return Object.assign({}, action.payload);
    }

    case HeroActions.RESET_BLANK_HERO: {
      return Object.assign({}, initialState);
    }

    default: {
      return state;
    }
  }
}

export function getHero() {
  return (state$: Observable<HeroState>) => state$;
}
