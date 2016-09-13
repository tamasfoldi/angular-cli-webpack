import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs/Rx';
import { Store } from '@ngrx/store';
import { HeroActions } from '../../actions';
import { AppState, getSearchResults } from '../../reducers';
import { Hero } from '../../interfaces';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css']
})
export class HeroSearchComponent implements OnInit, OnDestroy {
  heroes: Observable<Hero[]>;
  keyup$ = new Subject<KeyboardEvent>();

  constructor(
    private router: Router,
    private store: Store<AppState>,
    private heroActions: HeroActions) { }

  search(term: string): void {
    this.store.dispatch(this.heroActions.search(term));
  }

  ngOnInit(): void {
    this.heroes = this.store.let(getSearchResults());

    this.keyup$
      .debounceTime(300)
      .map(event => (event.target as HTMLInputElement).value)
      .distinctUntilChanged()
      .subscribe(term => this.search(term));
  }

  ngOnDestroy(): void {
    this.search('');
  }

  gotoDetail(hero: Hero): void {
    let link = ['/detail', hero.id];
    this.router.navigate(link);
  }
}
