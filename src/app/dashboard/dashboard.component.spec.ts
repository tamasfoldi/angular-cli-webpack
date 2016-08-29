/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { DashboardComponent } from './dashboard.component';
import { routeTestProviders, createRoot, advance, RootCmp, BlankCmp } from '../../helpers/route.provider.helper';
import { HeroSearchService } from '../hero-search.service';
import { HeroService } from '../hero.service';
import { HeroMockService } from '../../helpers/hero.mock.service';
import { HeroMockSearchService } from '../../helpers/hero.search.mock.service';
import {
  inject,
  fakeAsync,
  addProviders
} from '@angular/core/testing';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { TestComponentBuilder, TestBed } from '@angular/core/testing';
import { AppComponent } from '../app.component';
import { HeroDetailComponent } from '../hero-detail/hero-detail.component';
import { HeroSearchComponent } from '../hero-search/hero-search.component';
import { HeroesComponent } from '../heroes/heroes.component';
import { FormsModule } from '@angular/forms';

describe('Component: Dashboard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        routeTestProviders(),
        { provide: HeroService, useClass: HeroMockService },
                { provide: HeroSearchService, useClass: HeroMockSearchService }

      ],
      declarations: [HeroSearchComponent, RootCmp, HeroesComponent, DashboardComponent, HeroDetailComponent, BlankCmp],
      imports: [FormsModule]
    });
  });

  it('should display heroes', fakeAsync(
    inject([Router, TestComponentBuilder, HeroService, Location],
      (router: Router, tcb: TestComponentBuilder,
        mockHeroService: HeroService, location: Location) => {
        const f = createRoot(tcb, router, RootCmp);
        expect(location.path()).toEqual('/');

        router.navigateByUrl('/dashboard');
        advance(f);
        expect(location.path()).toEqual('/dashboard');

        let dashboard = f.debugElement.nativeElement;
        expect(dashboard.querySelectorAll('.hero').length).toBe(2);
      })
  )
  );

  it('should navigate to hero detail', fakeAsync(
    inject([Router, TestComponentBuilder, HeroService, Location],
      (router: Router, tcb: TestComponentBuilder,
        mockHeroService: HeroService, location: Location) => {
        const f = createRoot(tcb, router, RootCmp);
        expect(location.path()).toEqual('/');

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
    inject([Router, TestComponentBuilder, HeroService, Location],
      (router: Router, tcb: TestComponentBuilder,
        mockHeroService: HeroService, location: Location) => {
        const f = createRoot(tcb, router, RootCmp);
        expect(location.path()).toEqual('/');

        router.navigateByUrl('/dashboard');
        advance(f);
        expect(location.path()).toEqual('/dashboard');

        let heroElement = <DashboardComponent>f.debugElement.children[1].componentInstance;
        spyOn(heroElement, "gotoDetail");
        f.debugElement.nativeElement.querySelector('.hero').click();
        expect(heroElement.gotoDetail).toHaveBeenCalled();
      })
  )
  );
});
