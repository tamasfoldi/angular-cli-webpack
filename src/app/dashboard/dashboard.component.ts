import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState, getAllHeroes } from '../reducers/index';
import { Observable } from 'rxjs/Rx';
import { HeroActions } from '../actions/hero.actions';
import { Hero } from '../hero';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  heroes: Observable<Hero[]>;
  constructor(
    private router: Router,
    private store: Store<AppState>,
    private heroActions: HeroActions) {
  }

  ngOnInit(): void {
    this.heroes = this.store.let(getAllHeroes()).map(heroes => heroes.slice(1, 5));
  }

  gotoDetail(hero: Hero): void {
    let link = ['/detail', hero.id];
    this.router.navigate(link);
  }
}
