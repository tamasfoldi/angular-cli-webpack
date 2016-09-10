import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState, getHeroCollection } from '../reducers/index';
import { Observable } from 'rxjs/Rx';
import { HeroActions } from '../actions/hero.actions';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  heroes: Observable<Hero[]>;
  constructor(
    private router: Router,
    private heroService: HeroService,
    private store: Store<AppState>,
    private heroActions: HeroActions) {
  }

  ngOnInit(): void {
    this.heroes = this.store.let(getHeroCollection()).map(heroes => heroes.slice(1, 5));
  }

  gotoDetail(hero: Hero): void {
    let link = ['/detail', hero.id];
    this.router.navigate(link);
  }
}
