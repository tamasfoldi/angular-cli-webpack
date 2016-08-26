/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { routeTestProviders, createRoot, advance, RootCmp, BlankCmp } from '../../helpers/route.provider.helper';
import { HeroService } from '../hero.service';
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
import { HeroDetailComponent } from './hero-detail.component';
import { getDOM } from '@angular/platform-browser/src/dom/dom_adapter';

describe('Component: Hero Detail', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        routeTestProviders(),
        { provide: HeroService, useClass: HeroMockService }
      ],
      declarations: [HeroDetailComponent, BlankCmp],
      imports: [FormsModule]
    });
  });

  it('should show the details of the hero', fakeAsync(
    inject([Router, TestComponentBuilder, HeroService, Location],
      (router: Router, tcb: TestComponentBuilder,
        mockHeroService: HeroService, location: Location) => {
        const f = createRoot(tcb, router, RootCmp);
        expect(location.path()).toEqual('/');

        router.navigateByUrl('/detail/0');
        advance(f);
        advance(f);
        expect(location.path()).toEqual('/detail/0');
        let hero = f.debugElement.nativeElement;

        expect(hero.querySelector('h2').innerHTML).toBe('Test Hero 1 details!');
        expect(hero.querySelector('input').value).toBe('Test Hero 1');
        expect(hero.querySelector('span').innerHTML).toBe('0');
      })
  ));

  it('should bind the input value to the name of the hero', fakeAsync(
    inject([Router, TestComponentBuilder, HeroService, Location],
      (router: Router, tcb: TestComponentBuilder,
        mockHeroService: HeroService, location: Location) => {
        const f = createRoot(tcb, router, RootCmp);
        expect(location.path()).toEqual('/');

        router.navigateByUrl('/detail/0');
        advance(f);
        advance(f);
        expect(location.path()).toEqual('/detail/0');
        let hero = f.debugElement.nativeElement;
        let herodetailRef = <HeroDetailComponent>f.debugElement.children[1].componentInstance;
        hero.querySelector('input').value = 'Modified Test Hero';
        advance(f);
        getDOM().dispatchEvent(hero.querySelector('input'), getDOM().createEvent('input'));

        expect(herodetailRef.hero.name).toEqual('Modified Test Hero');
      })
  ));

  it('should call the back on click the button', fakeAsync(
    inject([Router, TestComponentBuilder, HeroService, Location],
      (router: Router, tcb: TestComponentBuilder,
        mockHeroService: HeroService, location: Location) => {
        const f = createRoot(tcb, router, RootCmp);
        expect(location.path()).toEqual('/');

        router.navigateByUrl('/detail/0');
        advance(f);
        advance(f);
        expect(location.path()).toEqual('/detail/0');
        let hero = f.debugElement.nativeElement;
        let herodetailRef = <HeroDetailComponent>f.debugElement.children[1].componentInstance;
        spyOn(herodetailRef, 'goBack');
        hero.querySelectorAll('button')[0].click();

        expect(herodetailRef.goBack).toHaveBeenCalled();
      })
  ));

  it('should call the save on click the button', fakeAsync(
    inject([Router, TestComponentBuilder, HeroService, Location],
      (router: Router, tcb: TestComponentBuilder,
        mockHeroService: HeroService, location: Location) => {
        const f = createRoot(tcb, router, RootCmp);
        expect(location.path()).toEqual('/');

        router.navigateByUrl('/detail/0');
        advance(f);
        advance(f);
        expect(location.path()).toEqual('/detail/0');
        let hero = f.debugElement.nativeElement;
        let herodetailRef = <HeroDetailComponent>f.debugElement.children[1].componentInstance;
        spyOn(herodetailRef, 'save');
        hero.querySelectorAll('button')[1].click()

        expect(herodetailRef.save).toHaveBeenCalled();
      })
  ));

  it('should save the hero detail', fakeAsync(
    inject([Router, TestComponentBuilder, HeroService, Location],
      (router: Router, tcb: TestComponentBuilder,
        mockHeroService: HeroService, location: Location) => {
        const f = createRoot(tcb, router, RootCmp);
        expect(location.path()).toEqual('/');

        router.navigateByUrl('/detail/0');
        advance(f);
        expect(location.path()).toEqual('/detail/0');
        let herodetailRef = <HeroDetailComponent>f.debugElement.children[1].componentInstance;
        spyOn(herodetailRef, 'goBack');
        herodetailRef.hero = { id: 0, name: 'Modified Test Hero' };
        herodetailRef.save();
        advance(f);

        expect(herodetailRef.goBack).toHaveBeenCalled();
        expect(herodetailRef.goBack).toHaveBeenCalledWith({ id: 0, name: 'Modified Test Hero' });
      })
  ));

  it('should set the error', fakeAsync(
    inject([Router, TestComponentBuilder, HeroService, Location],
      (router: Router, tcb: TestComponentBuilder,
        mockHeroService: HeroService, location: Location) => {
        const f = createRoot(tcb, router, RootCmp);
        expect(location.path()).toEqual('/');

        router.navigateByUrl('/detail/0');
        spyOn(mockHeroService, 'save').and.callFake(() => Promise.reject('save fail'));

        advance(f);
        expect(location.path()).toEqual('/detail/0');
        let herodetailRef = <HeroDetailComponent>f.debugElement.children[1].componentInstance;
        spyOn(herodetailRef, 'goBack');
        herodetailRef.hero = { id: 0, name: 'Modified Test Hero' };
        herodetailRef.save();
        advance(f);

        expect(herodetailRef.goBack).not.toHaveBeenCalled();
        expect(herodetailRef.error).toBe('save fail')
      })
  ));

  it('should navigate back on back', fakeAsync(
    inject([Router, TestComponentBuilder, HeroService, Location],
      (router: Router, tcb: TestComponentBuilder,
        mockHeroService: HeroService, location: Location) => {
        const f = createRoot(tcb, router, RootCmp);
        expect(location.path()).toEqual('/');

        router.navigateByUrl('/detail/0');

        advance(f);
        expect(location.path()).toEqual('/detail/0');
        let herodetailRef = <HeroDetailComponent>f.debugElement.children[1].componentInstance;
        spyOn(window.history, 'back');
        herodetailRef.goBack();
        advance(f);

        expect(window.history.back).toHaveBeenCalled();
      })
  ));

});
