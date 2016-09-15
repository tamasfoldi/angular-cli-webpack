import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HeroSearchService } from '../app/hero-search.service';

import { Hero } from '../app/hero';
const HEROES: Hero[] = [{ id: 0, name: 'T1' }, { id: 1, name: 'T12' }, { id: 2, name: 'T123' }];

@Injectable()
export class HeroMockSearchService {

  constructor() { }
  search(term: string): Observable<Hero[]> {
    if (term === 'error') {
      throw (new Error());
    }
    return Observable.of(HEROES.filter(h => h.name.indexOf(term) >= 0));
  }

  getProviders(): Array<any> {
    return [{provide: HeroSearchService, useValue: this}];
  }
}
