/* tslint:disable:member-ordering */
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Hero } from '../interfaces';


/**
 * Instead of passing around action string constants and manually recreating
 * action objects at the point of dispatch, we create services encapsulating
 * each appropriate action group. Action types are included as static
 * members and kept next to their action creator. This promotes a
 * uniform interface and single import for appropriate actions
 * within your application components.
 */
@Injectable()
export class HeroActions {
  static SEARCH = '[Hero] Search';
  search(query: string): Action {
    return {
      type: HeroActions.SEARCH,
      payload: query
    };
  }

  static SEARCH_COMPLETE = '[Hero] Search Complete';
  searchComplete(results: Hero[]): Action {
    return {
      type: HeroActions.SEARCH_COMPLETE,
      payload: results
    };
  }

  static ADD_HERO = '[Hero] Add Hero';
  addHero(hero: Hero): Action {
    return {
      type: HeroActions.ADD_HERO,
      payload: hero
    };
  }

  static ADD_HERO_SUCCESS = '[Hero] Add Hero Success';
  addHeroSuccess(hero: Hero): Action {
    return {
      type: HeroActions.ADD_HERO_SUCCESS,
      payload: hero
    };
  }

  static ADD_HERO_FAIL = '[Hero] Add Hero Fail';
  addHeroFail(hero: Hero): Action {
    return {
      type: HeroActions.ADD_HERO_FAIL,
      payload: hero
    };
  }

  static REMOVE_HERO = '[Hero] Remove Hero';
  removeHero(hero: Hero): Action {
    return {
      type: HeroActions.REMOVE_HERO,
      payload: hero
    };
  }

  static REMOVE_HERO_SUCCESS = '[Hero] Remove Hero Success';
  removeHeroSuccess(hero: Hero): Action {
    return {
      type: HeroActions.REMOVE_HERO_SUCCESS,
      payload: hero
    };
  }

  static REMOVE_HERO_FAIL = '[Hero] Remove Hero Fail';
  removeHeroFail(hero: Hero): Action {
    return {
      type: HeroActions.REMOVE_HERO_FAIL,
      payload: hero
    };
  }

  static LOAD_HEROES = '[Hero] Load Heroes';
  loadHeroes(): Action {
    return {
      type: HeroActions.LOAD_HEROES
    };
  }

  static LOAD_HEROES_SUCCESS = '[Hero] Load Heroes Success';
  loadHeroesSuccess(heroes: Hero[]): Action {
    return {
      type: HeroActions.LOAD_HEROES_SUCCESS,
      payload: heroes
    };
  }

  static LOAD_HERO = '[Hero] Load Hero';
  loadHero(hero: Hero): Action {
    return {
      type: HeroActions.LOAD_HERO,
      payload: hero
    };
  }

  static EDIT_HERO = '[Hero] Edit Hero';
  editHero(hero: Hero): Action {
    return {
      type: HeroActions.EDIT_HERO,
      payload: hero
    };
  }

  static EDIT_HERO_SUCCESS = '[Hero] Edit Hero Success';
  editHeroSuccess(hero: Hero): Action {
    return {
      type: HeroActions.EDIT_HERO_SUCCESS,
      payload: hero
    };
  }

  static EDIT_HERO_FAIL = '[Hero] Edit Hero Fail';
  editHeroFail(hero: Hero): Action {
    return {
      type: HeroActions.EDIT_HERO_FAIL,
      payload: hero
    };
  }
}
