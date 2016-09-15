/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { DashboardComponent } from './dashboard.component';
import { createRoot, advance, RootComponent, BlankComponent, configureTests } from '../../helpers/route.provider.helper';
import { HeroSearchService } from '../hero-search.service';
import { HeroService } from '../hero.service';
import { HeroMockService } from '../../helpers/hero.mock.service';
import { HeroMockSearchService } from '../../helpers/hero.search.mock.service';
import {
  inject,
  fakeAsync
} from '@angular/core/testing';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { AppComponent } from '../app.component';
import { HeroDetailComponent } from '../hero-detail/hero-detail.component';
import { HeroSearchComponent } from '../hero-search/hero-search.component';
import { HeroesComponent } from '../heroes/heroes.component';
import { FormsModule } from '@angular/forms';

describe('Component: Dashboard', () => {
  beforeEach(() => {
    configureTests();
  });

  it('should display heroes', fakeAsync(
    inject([Router, HeroService, Location],
      (router: Router, mockHeroService: HeroService, location: Location) => {
        const f = createRoot(router, RootComponent);

        router.navigateByUrl('/dashboard');
        advance(f);
        expect(location.path()).toEqual('/dashboard');

        let dashboard = f.debugElement.nativeElement;
        expect(dashboard.querySelectorAll('.hero').length).toBe(2);
      })
  )
  );

  it('should navigate to hero detail', fakeAsync(
    inject([Router, HeroService, Location],
      (router: Router, mockHeroService: HeroService, location: Location) => {
        const f = createRoot(router, RootComponent);

        router.navigateByUrl('/dashboard');
        advance(f);
        expect(location.path()).toEqual('/dashboard');

        let heroElement = <DashboardComponent>f.debugElement.children[1].componentInstance;
        heroElement.gotoDetail(heroElement.heroes[0]);
        advance(f);
        expect(location.path()).toEqual('/detail/1');
      })
  )
  );

  it('should call the gotoDetail when a hero was clicked', fakeAsync(
    inject([Router, HeroService, Location],
      (router: Router, mockHeroService: HeroService, location: Location) => {
        const f = createRoot(router, RootComponent);

        router.navigateByUrl('/dashboard');
        advance(f);
        expect(location.path()).toEqual('/dashboard');

        let heroElement = <DashboardComponent>f.debugElement.children[1].componentInstance;
        spyOn(heroElement, 'gotoDetail');
        f.debugElement.nativeElement.querySelector('.hero').click();
        expect(heroElement.gotoDetail).toHaveBeenCalled();
      })
  )
  );
});
