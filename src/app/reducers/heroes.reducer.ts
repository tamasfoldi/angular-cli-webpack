/* tslint:disable:no-switch-case-fall-through */

import '@ngrx/core/add/operator/select';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';

import { Hero } from '../interfaces/hero';
import { HeroActions } from '../actions';


export type HeroesState = Hero[];

const initialState: HeroesState = [];

export default function (state = initialState, action: Action): HeroesState {
  switch (action.type) {
    case HeroActions.LOAD_HEROES_SUCCESS: {
      const heroes: Hero[] = action.payload;
      const new_heroes = heroes.filter(hero => !state[hero.id]);

      return [...state, ...new_heroes];
    }

    case HeroActions.ADD_HERO_SUCCESS:
    case HeroActions.REMOVE_HERO_FAIL: {
      const hero: Hero = action.payload;
      if (state.some(h => h.id === hero.id)) {
        return state;
      }

      return [...state, hero];
    }

    case HeroActions.REMOVE_HERO_SUCCESS:
    case HeroActions.ADD_HERO_FAIL: {
      const hero: Hero = action.payload;

      return state.filter(h => h.id !== hero.id);
    }

    case HeroActions.EDIT_HERO_SUCCESS: {
      const hero: Hero = action.payload;
      let heroes = [hero, ...state.filter(h => hero.id !== h.id)];
      heroes.sort((a, b) => {
        return a.id > b.id ? 1 : -1;
      });

      return heroes;
    }

    default: {
      return state;
    }
  }
}

export function getAllHeroes() {
  return (state$: Observable<HeroesState>) => state$;
};
