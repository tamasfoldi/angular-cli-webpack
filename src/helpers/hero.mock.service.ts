import { Injectable } from '@angular/core';
import { HeroService } from '../app/hero.service';
import { Headers, Http, Response, ResponseOptions } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Rx';

import { Hero } from '../app/hero';

@Injectable()
export class HeroMockService {
  heroes = [
    { id: 0, name: 'Test Hero 1' }, 
    { id: 1, name: 'Test Hero 2' }, 
    { id: 2, name: 'Test Hero 3' }
  ];
  constructor() { }

  getHeroes(): Promise<Hero[]> {
    return Observable.of([{ id: 0, name: 'Test Hero 1' }, { id: 1, name: 'Test Hero 2' }, { id: 2, name: 'Test Hero 3' }]).toPromise();
  }

  getHero(id: number): Promise<Hero> {
    return this.getHeroes()
      .then(heroes => heroes.find(hero => hero.id === id));
  }

  save(hero: Hero): Promise<Hero> {
    if (hero.id) {
      return this.put(hero);
    }
    return this.post(hero);
  }

  delete(hero: Hero): Promise<Response> {
    return Observable.of(new Response(new ResponseOptions({ status: 200, statusText: "OK" }))).toPromise();
  }

  // Add new Hero
  private post(hero: Hero): Promise<Hero> {
    return Observable.of(hero).toPromise();
  }

  // Update existing Hero
  private put(hero: Hero): Promise<Hero> {
    return Observable.of(hero).toPromise();
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
