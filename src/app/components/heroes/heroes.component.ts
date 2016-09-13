import { Component, OnInit } from '@angular/core';
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
export class HeroesComponent implements OnInit {
  heroes$: Observable<Hero[]>;
  selectedHero: Hero;
  addingHero = false;
  error: any;

  constructor(
    private router: Router,
    private store: Store<AppState>,
    private heroActions: HeroActions) {
  }

  getHeroes(): void {
    this.heroes$ = this.store.let(getAllHeroes());

  }

  addHero(): void {
    this.addingHero = true;
    this.selectedHero = null;
  }

  close(savedHero: Hero): void {
    this.addingHero = false;
    if (savedHero) { this.getHeroes(); }
  }

  deleteHero(hero: Hero, event: any): void {
    event.stopPropagation();
    this.store.dispatch(this.heroActions.removeHero(hero));
    if (this.selectedHero.id === hero.id) {
      this.selectedHero = null;
    }
  }

  ngOnInit(): void {
    this.getHeroes();
  }

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
    this.addingHero = false;
  }

  gotoDetail(): void {
    this.router.navigate(['/detail', this.selectedHero.id]);
  }
}
