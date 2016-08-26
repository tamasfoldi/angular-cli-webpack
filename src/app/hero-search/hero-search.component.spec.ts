/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { routeTestProviders, createRoot, advance, RootCmp, BlankCmp } from '../../helpers/route.provider.helper';
import { HeroSearchService } from '../hero-search.service';
import { HeroService } from '../hero.service';
import { HeroMockSearchService } from '../../helpers/hero.search.mock.service';
import { HeroMockService } from '../../helpers/hero.mock.service';
import {
  inject,
  fakeAsync,
  addProviders
} from '@angular/core/testing';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { TestComponentBuilder, TestBed } from '@angular/core/testing';
import { AppComponent } from '../app.component';
import { FormsModule } from '@angular/forms';
import { HeroSearchComponent } from './hero-search.component';
import { getDOM } from '@angular/platform-browser/src/dom/dom_adapter';

describe('Component: Hero Search', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        routeTestProviders(),
        { provide: HeroService, useClass: HeroMockService },
        { provide: HeroSearchService, useClass: HeroMockSearchService }
      ],
      declarations: [HeroSearchComponent, BlankCmp],
      imports: [FormsModule]
    });
  });

  it('should display heroes', fakeAsync(
    inject([Router, TestComponentBuilder, HeroSearchService, Location],
      (router: Router, tcb: TestComponentBuilder,
        service: HeroSearchService, location: Location) => {
        const f = createRoot(tcb, router, RootCmp);
        expect(location.path()).toEqual('/');
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
    inject([Router, TestComponentBuilder, HeroSearchService, Location],
      (router: Router, tcb: TestComponentBuilder,
        service: HeroSearchService, location: Location) => {
        const f = createRoot(tcb, router, RootCmp);
        expect(location.path()).toEqual('/');
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
    inject([Router, TestComponentBuilder, HeroSearchService, Location],
      (router: Router, tcb: TestComponentBuilder,
        service: HeroSearchService, location: Location) => {
        const f = createRoot(tcb, router, RootCmp);
        expect(location.path()).toEqual('/');
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
    inject([Router, TestComponentBuilder, HeroSearchService, Location],
      (router: Router, tcb: TestComponentBuilder,
        service: HeroSearchService, location: Location) => {
        const f = createRoot(tcb, router, RootCmp);
        expect(location.path()).toEqual('/');
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
    inject([Router, TestComponentBuilder, HeroSearchService, Location],
      (router: Router, tcb: TestComponentBuilder,
        service: HeroSearchService, location: Location) => {
        const f = createRoot(tcb, router, RootCmp);
        expect(location.path()).toEqual('/');
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
    inject([Router, TestComponentBuilder, HeroSearchService, Location],
      (router: Router, tcb: TestComponentBuilder,
        service: HeroSearchService, location: Location) => {
        const f = createRoot(tcb, router, RootCmp);
        expect(location.path()).toEqual('/');
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

})