import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Store } from '@ngrx/store';
import { HeroActions } from '../../actions';
import { AppState, getHero } from '../../reducers';
import { Hero } from '../../interfaces';
import { Observable } from 'rxjs/Rx';
@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  @Output() close = new EventEmitter();
  error: any;
  hero: Observable<any>;
  navigated = false;

  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>,
    private heroActions: HeroActions) {
  }

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      if (params['id'] !== undefined) {
        this.hero = this.store.select('heroes')
          .map(heroes => (<any>heroes).entities
            .filter(hero => hero.id === parseInt(params['id'], 10))
          )
          .map(heroes => heroes[0]);
        this.navigated = true;
      } else {
        // this.store.dispatch(this.heroActions.resetBlankHero());
        this.navigated = false;
      }
    });
  }

  save(hero: Hero): void {
    if (!hero.id) {
      this.store.dispatch(this.heroActions.addHero(hero));
    } else {
      this.store.dispatch(this.heroActions.editHero(hero));
    }
    this.goBack(hero);
  }

  goBack(savedHero: Hero = null): void {
    this.close.emit(savedHero);
    if (this.navigated) { window.history.back(); }
  }
}
