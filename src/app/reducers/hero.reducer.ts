/* tslint:disable:no-switch-case-fall-through */

import '@ngrx/core/add/operator/select';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';

import { Hero } from '../hero';
import { HeroActions } from '../actions';


export interface HeroesState {
  ids: number[];
  entities: { [id: number]: Hero };
};

const initialState: HeroesState = {
  ids: [],
  entities: {}
};

export default function (state = initialState, action: Action): HeroesState {
  switch (action.type) {
    case HeroActions.SEARCH_COMPLETE:
    case HeroActions.LOAD_COLLECTION_SUCCESS: {
      const HEROES: Hero[] = action.payload;
      const NEW_HEROES = HEROES.filter(hero => !state.entities[hero.id]);

      const NEW_HEROE_IDS = NEW_HEROES.map(Hero => Hero.id);
      const NEW_HEROE_ENTITIES = NEW_HEROES.reduce((entities: { [id: number]: Hero }, Hero: Hero) => {
        return Object.assign(entities, {
          [Hero.id]: Hero
        });
      }, {});

      return {
        ids: [...state.ids, ...NEW_HEROE_IDS],
        entities: Object.assign({}, state.entities, NEW_HEROE_ENTITIES)
      };
    }

    case HeroActions.LOAD_HERO: {
      const HERO: Hero = action.payload;

      if (state.ids.some(id => id === HERO.id)) {
        return state;
      }

      return {
        ids: [...state.ids, HERO.id],
        entities: Object.assign({}, state.entities, {
          [HERO.id]: Hero
        })
      };
    }

    default: {
      return state;
    }
  }
}

export function getHeroEntities() {
  return (state$: Observable<HeroesState>) => state$
    .select(s => s.entities);
};

export function getHero(id: number) {
  return (state$: Observable<HeroesState>) => state$
    .select(s => s.entities[id]);
}

export function getHeros(HeroIds: number[]) {
  return (state$: Observable<HeroesState>) => state$
    .let(getHeroEntities())
    .map(entities => HeroIds.map(id => entities[id]));
}

export function hasHero(id: number) {
  return (state$: Observable<HeroesState>) => state$
    .select(s => s.ids.some(i => i === id));
}
