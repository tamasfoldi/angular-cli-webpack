/* tslint:disable:no-switch-case-fall-through */

import '@ngrx/core/add/operator/select';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';

import { Hero } from '../hero';
import { HeroActions } from '../actions';


export interface HeroesState {
  entities: Hero[];
};

const initialState: HeroesState = {
  entities: []
};

export default function (state = initialState, action: Action): HeroesState {
  switch (action.type) {
    case HeroActions.LOAD_HEROES_SUCCESS: {
      const heroes: Hero[] = action.payload;
      const new_heroes = heroes.filter(hero => !state.entities[hero.id]);

      return {
        entities: [...state.entities, ...new_heroes]
      };
    }

    case HeroActions.LOAD_HERO: {
      const hero: Hero = action.payload;

      if (state.entities.some(h => h.id === hero.id)) {
        return state;
      }

      return {
        entities: [...state.entities, hero]
      };
    }

    case HeroActions.ADD_HERO_SUCCESS:
    case HeroActions.REMOVE_HERO_FAIL: {
      const hero: Hero = action.payload;
      if (state.entities.some(h => h.id === hero.id)) {
        return state;
      }

      return Object.assign({}, state, {
        entities: [...state.entities, hero]
      });
    }

    case HeroActions.REMOVE_HERO_SUCCESS:
    case HeroActions.ADD_HERO_FAIL: {
      const hero: Hero = action.payload;

      return Object.assign({}, state, {
        entities: state.entities.filter(h => h.id !== hero.id)
      });
    }

    case HeroActions.EDIT_HERO_SUCCESS: {
      const hero: Hero = action.payload;
      let heroes = [...state.entities.filter(h => hero.id !== h.id), hero];
      heroes.sort((a, b) => {
        return a.id > b.id ? 1 : 0;
      });

      return Object.assign({}, state, {
        entities: heroes
      });
    }

    default: {
      return state;
    }
  }
}

export function getAllHeroes() {
  return (state$: Observable<HeroesState>) => state$
    .select(s => s.entities);
};

export function getHero(id: number) {
  return (state$: Observable<HeroesState>) => state$
    .select(s => s.entities[id]);
}

export function getHeroes(heroIds: number[]) {
  return (state$: Observable<HeroesState>) => state$
    .let(getAllHeroes())
    .map(entities => heroIds.map(id => entities[id]));
}

export function hasHero(id: number) {
  return (state$: Observable<HeroesState>) => state$
    .select(s => s.entities.some(h => h.id === id));
}
