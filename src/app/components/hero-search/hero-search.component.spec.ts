/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { configureTests, createRoot, advance, RootComponent, BlankComponent } from '../../../helpers/route.provider.helper';
import { HeroSearchService, HeroService } from '../../services';
import { HeroMockSearchService } from '../../../helpers/hero.search.mock.service';
import { HeroMockService } from '../../../helpers/hero.mock.service';
import {
  inject,
  fakeAsync,
  tick
} from '@angular/core/testing';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { AppComponent } from '../app.component';
import { FormsModule } from '@angular/forms';
import { HeroSearchComponent } from './hero-search.component';
import { HeroDetailComponent } from '../hero-detail/hero-detail.component';
import { HeroesComponent } from '../heroes/heroes.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { getDOM } from '@angular/platform-browser/src/dom/dom_adapter';

describe('Component: Hero Search', () => {
  beforeEach(() => {
    configureTests();
  });

  it('should display heroes', fakeAsync(
    inject([Router, HeroSearchService, Location],
      (router: Router, service: HeroSearchService, location: Location) => {
        const f = createRoot(router, RootComponent);
        router.navigateByUrl('/search');
        advance(f);
        expect(location.path()).toEqual('/search');

        let search = f.debugElement.nativeElement;
        let input = search.querySelector('input');
        let searchRef = <HeroSearchComponent>f.debugElement.children[1].componentInstance;
        let heroes;
        searchRef.heroes.subscribe(h => heroes = h);
        input.value = 'T12';
        getDOM().dispatchEvent(input, getDOM().createEvent('keyup'));
        tick(300);
        advance(f);

        expect(search.querySelectorAll('.search-result').length).toBe(2);
      })
  )
  );

  it('should fetch the heroes', fakeAsync(
    inject([Router, HeroSearchService, Location],
      (router: Router, service: HeroSearchService, location: Location) => {
        const f = createRoot(router, RootComponent);
        router.navigateByUrl('/search');
        advance(f);
        expect(location.path()).toEqual('/search');

        let search = f.debugElement.nativeElement;
        let searchRef = <HeroSearchComponent>f.debugElement.children[1].componentInstance;
        let heroes;
        searchRef.heroes.subscribe(h => heroes = h);
        searchRef.search('T123');
        tick(300);
        advance(f);

        expect(heroes).toEqual([{ id: 2, name: 'T123' }]);
      })
  )
  );

  it('should have [] if no term', fakeAsync(
    inject([Router, HeroSearchService, Location],
      (router: Router, service: HeroSearchService, location: Location) => {
        const f = createRoot(router, RootComponent);
        router.navigateByUrl('/search');
        advance(f);
        expect(location.path()).toEqual('/search');

        let search = f.debugElement.nativeElement;
        let searchRef = <HeroSearchComponent>f.debugElement.children[1].componentInstance;
        let heroes;
        searchRef.heroes.subscribe(h => heroes = h);
        searchRef.search(null);
        tick(300);
        advance(f);

        expect(heroes).toEqual([]);
      })
  )
  );

  it('should have [] if there is an error', fakeAsync(
    inject([Router, HeroSearchService, Location],
      (router: Router, service: HeroSearchService, location: Location) => {
        const f = createRoot(router, RootComponent);
        router.navigateByUrl('/search');
        advance(f);
        expect(location.path()).toEqual('/search');

        let search = f.debugElement.nativeElement;
        let searchRef = <HeroSearchComponent>f.debugElement.children[1].componentInstance;
        let heroes;
        searchRef.heroes.subscribe(h => heroes = h);
        searchRef.search('error');
        tick(300);
        advance(f);

        expect(heroes).toEqual([]);
      })
  )
  );

  it('should navigate to hero detail', fakeAsync(
    inject([Router, HeroSearchService, Location],
      (router: Router, service: HeroSearchService, location: Location) => {
        const f = createRoot(router, RootComponent);
        router.navigateByUrl('/search');
        advance(f);
        expect(location.path()).toEqual('/search');

        let searchRef = <HeroSearchComponent>f.debugElement.children[1].componentInstance;
        searchRef.gotoDetail({ id: 0, name: 'T123' });
        advance(f);

        expect(location.path()).toEqual('/detail/0');
      })
  )
  );

  it('should call gotoDetail on list click', fakeAsync(
    inject([Router, HeroSearchService, Location],
      (router: Router, service: HeroSearchService, location: Location) => {
        const f = createRoot(router, RootComponent);
        router.navigateByUrl('/search');
        advance(f);
        expect(location.path()).toEqual('/search');

        let search = f.debugElement.nativeElement;
        let input = search.querySelector('input');
        let searchRef = <HeroSearchComponent>f.debugElement.children[1].componentInstance;
        spyOn(searchRef, 'gotoDetail');
        input.value = 'T12';
        getDOM().dispatchEvent(input, getDOM().createEvent('keyup'));
        tick(300);
        advance(f);
        search.querySelector('.search-result').click();
        advance(f);


        expect(searchRef.gotoDetail).toHaveBeenCalled();
        expect(searchRef.gotoDetail).toHaveBeenCalledWith({ id: 1, name: 'T12' });
      })
  )
  );

});
