import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';
import { AppState, getAllHeroes } from '../../reducers';
import { Observable } from 'rxjs/Rx';
import { HeroActions } from '../../actions';

import { Hero } from '../../interfaces';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent {
  heroes$: Observable<{}>;
  selectedHero: Hero;
  addingHero = false;
  error: any;

  constructor(
    private store: Store<AppState>,
    private heroActions: HeroActions,
    private router: Router
  ) {
    this.heroes$ = store.select('heroes');
  }

  addHero() {
    this.addingHero = true;
    this.selectedHero = null;
  }

  close() {
    this.addingHero = false;
  }

  delete(hero) {
    this.store.dispatch(this.heroActions.removeHero(hero));
  }

  select(hero) {
    this.selectedHero = hero;
    this.addingHero = false;
  }

  gotoDetail() {
    this.router.navigate(['/detail/' + this.selectedHero.id]);
  }
}
