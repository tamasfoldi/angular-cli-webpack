import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { Store } from '@ngrx/store';
import { HeroActions } from '../actions/hero.actions';
import { AppState, getSearchResults } from '../reducers/index';
import { HeroSearchService } from '../hero-search.service';
import { Hero } from '../hero';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css']
})
export class HeroSearchComponent implements OnInit, OnDestroy {
  heroes: Observable<Hero[]>;

  constructor(
    private heroSearchService: HeroSearchService,
    private router: Router,
    private store: Store<AppState>,
    private heroActions: HeroActions ) { }

  search(term: string): void {
    // Push a search term into the observable stream.
    this.store.dispatch(this.heroActions.search(term));
  }

  ngOnInit(): void {
    this.heroes = this.store.let(getSearchResults())
      .debounceTime(300)        // wait for 300ms pause in events
      .distinctUntilChanged();   // ignore if next search term is same as previous
  }

  ngOnDestroy(): void {
    this.search('');
  }

  gotoDetail(hero: Hero): void {
    let link = ['/detail', hero.id];
    this.router.navigate(link);
  }
}
