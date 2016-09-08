/* tslint:disable:member-ordering */
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Hero } from '../hero';


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

  static ADD_TO_COLLECTION = '[Hero] Add to Collection';
  addToCollection(Hero: Hero): Action {
    return {
      type: HeroActions.ADD_TO_COLLECTION,
      payload: Hero
    };
  }

  static ADD_TO_COLLECTION_SUCCESS = '[Hero] Add to Collection Success';
  addToCollectionSuccess(Hero: Hero): Action {
    return {
      type: HeroActions.ADD_TO_COLLECTION_SUCCESS,
      payload: Hero
    };
  }

  static ADD_TO_COLLECTION_FAIL = '[Hero] Add to Collection Fail';
  addToCollectionFail(Hero: Hero): Action {
    return {
      type: HeroActions.ADD_TO_COLLECTION_FAIL,
      payload: Hero
    };
  }

  static REMOVE_FROM_COLLECTION = '[Hero] Remove from Collection';
  removeFromCollection(Hero: Hero): Action {
    return {
      type: HeroActions.REMOVE_FROM_COLLECTION,
      payload: Hero
    };
  }

  static REMOVE_FROM_COLLECTION_SUCCESS = '[Hero] Remove From Collection Success';
  removeFromCollectionSuccess(Hero: Hero): Action {
    return {
      type: HeroActions.REMOVE_FROM_COLLECTION_SUCCESS,
      payload: Hero
    };
  }

  static REMOVE_FROM_COLLECTION_FAIL = '[Hero] Remove From Collection Fail';
  removeFromCollectionFail(Hero: Hero): Action {
    return {
      type: HeroActions.REMOVE_FROM_COLLECTION_FAIL,
      payload: Hero
    };
  }

  static LOAD_COLLECTION = '[Hero] Load Collection';
  loadCollection(): Action {
    return {
      type: HeroActions.LOAD_COLLECTION
    };
  }

  static LOAD_COLLECTION_SUCCESS = '[Hero] Load Collection Success';
  loadCollectionSuccess(Heros: Hero[]): Action {
    return {
      type: HeroActions.LOAD_COLLECTION_SUCCESS,
      payload: Heros
    };
  }

  static LOAD_HERO = '[Hero] Load Hero';
  loadHero(Hero: Hero): Action {
    return {
      type: HeroActions.LOAD_HERO,
      payload: Hero
    };
  }
}
