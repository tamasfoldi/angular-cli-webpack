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
import { HeroesComponent } from './heroes.component';

describe('Component: Heroes', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        routeTestProviders(),
        { provide: HeroService, useClass: HeroMockService }
      ],
      declarations: [HeroesComponent, BlankCmp],
      imports: [FormsModule]
    });
  });

  /*it('should create an instance', () => {
    let component = new HeroesComponent();
    expect(component).toBeTruthy();
  });*/

  it('should display heroes', fakeAsync(
    inject([Router, TestComponentBuilder, HeroService, Location],
      (router: Router, tcb: TestComponentBuilder,
        mockHeroService: HeroService, location: Location) => {
        const f = createRoot(tcb, router, RootCmp);
        expect(location.path()).toEqual('/');

        router.navigateByUrl('/heroes');
        advance(f);
        expect(location.path()).toEqual('/heroes');

        let heroes = f.debugElement.nativeElement;
        expect(heroes.querySelectorAll('li').length).toBe(3);
      })
  )
  );

  it('should display error on getHeroes fail', fakeAsync(
    inject([Router, TestComponentBuilder, HeroService, Location],
      (router: Router, tcb: TestComponentBuilder,
        mockHeroService: HeroService, location: Location) => {
        const f = createRoot(tcb, router, RootCmp);
        spyOn(mockHeroService, "getHeroes").and.callFake(() => Promise.reject("getHeroes fail"));
        expect(location.path()).toEqual('/');

        router.navigateByUrl('/heroes');
        advance(f);
        expect(location.path()).toEqual('/heroes');

        let heroes = f.debugElement.nativeElement;
        expect(heroes.querySelector('.error').innerHTML).toBe("getHeroes fail");
      })
  )
  );

  it('should call the addHero when "Add New Hero" was clicked', fakeAsync(
    inject([Router, TestComponentBuilder, HeroService, Location],
      (router: Router, tcb: TestComponentBuilder,
        mockHeroService: HeroService, location: Location) => {
        const f = createRoot(tcb, router, RootCmp);
        expect(location.path()).toEqual('/');

        router.navigateByUrl('/heroes');
        advance(f);
        expect(location.path()).toEqual('/heroes');

        let heroesCompRef = <HeroesComponent>f.debugElement.children[1].componentInstance;
        spyOn(heroesCompRef, "addHero");
        f.debugElement.nativeElement.querySelector('.add-hero').click();
        expect(heroesCompRef.addHero).toHaveBeenCalled();
      })
  )
  );

  it('should display "my-hero-detail" component', fakeAsync(
    inject([Router, TestComponentBuilder, HeroService, Location],
      (router: Router, tcb: TestComponentBuilder,
        mockHeroService: HeroService, location: Location) => {
        const f = createRoot(tcb, router, RootCmp);
        expect(location.path()).toEqual('/');

        router.navigateByUrl('/heroes');
        advance(f);
        expect(location.path()).toEqual('/heroes');

        let heroesCompRef = <HeroesComponent>f.debugElement.children[1].componentInstance;
        let heroNative = f.debugElement.nativeElement;
        expect(heroNative.querySelector('my-hero-detail')).toBeFalsy();
        expect(heroesCompRef.selectedHero).toBeUndefined();
        heroesCompRef.addHero();
        advance(f);
        expect(heroNative.querySelector('my-hero-detail')).toBeTruthy();
        expect(heroesCompRef.selectedHero).toBeNull();
      })
  )
  );

  it('should hide "my-hero-detail" component', fakeAsync(
    inject([Router, TestComponentBuilder, HeroService, Location],
      (router: Router, tcb: TestComponentBuilder,
        mockHeroService: HeroService, location: Location) => {
        const f = createRoot(tcb, router, RootCmp);
        expect(location.path()).toEqual('/');
        router.navigateByUrl('/heroes');
        advance(f);
        expect(location.path()).toEqual('/heroes');

        let heroesCompRef = <HeroesComponent>f.debugElement.children[1].componentInstance;
        let heroNative = f.debugElement.nativeElement;
        spyOn(heroesCompRef, "getHeroes");
        heroesCompRef.addingHero = true;
        advance(f);
        expect(heroNative.querySelector('my-hero-detail')).toBeTruthy();
        heroesCompRef.close(heroesCompRef.heroes[0]);
        advance(f);

        expect(heroNative.querySelector('my-hero-detail')).toBeFalsy();
        expect(heroesCompRef.addingHero).toBeFalsy();
        expect(heroesCompRef.getHeroes).toHaveBeenCalled();
      })
  )
  );

  it('should set the selected hero', fakeAsync(
    inject([Router, TestComponentBuilder, HeroService, Location],
      (router: Router, tcb: TestComponentBuilder,
        mockHeroService: HeroService, location: Location) => {
        const f = createRoot(tcb, router, RootCmp);
        expect(location.path()).toEqual('/');
        router.navigateByUrl('/heroes');
        advance(f);
        expect(location.path()).toEqual('/heroes');

        let heroesCompRef = <HeroesComponent>f.debugElement.children[1].componentInstance;
        let heroNative = f.debugElement.nativeElement;
        heroesCompRef.addingHero = true;
        advance(f);
        expect(heroNative.querySelector('my-hero-detail')).toBeTruthy();
        heroesCompRef.onSelect({ id: 0, name: "Test Hero" });
        advance(f);

        expect(heroNative.querySelector('my-hero-detail')).toBeFalsy();
        expect(heroesCompRef.addingHero).toBeFalsy();
        expect(heroesCompRef.selectedHero).toEqual({ id: 0, name: "Test Hero" });
      })
  )
  );

  it('should call onSelect with the clicked hero', fakeAsync(
    inject([Router, TestComponentBuilder, HeroService, Location],
      (router: Router, tcb: TestComponentBuilder,
        mockHeroService: HeroService, location: Location) => {
        const f = createRoot(tcb, router, RootCmp);
        expect(location.path()).toEqual('/');
        router.navigateByUrl('/heroes');
        advance(f);
        expect(location.path()).toEqual('/heroes');

        let heroesCompRef = <HeroesComponent>f.debugElement.children[1].componentInstance;
        let heroNative = f.debugElement.nativeElement;
        spyOn(heroesCompRef, "onSelect");
        heroesCompRef.addingHero = true;
        advance(f);
        expect(heroNative.querySelector('my-hero-detail')).toBeTruthy();
        heroNative.querySelector('li').click();
        advance(f);

        expect(heroesCompRef.onSelect).toHaveBeenCalled();
        expect(heroesCompRef.onSelect).toHaveBeenCalledWith(heroesCompRef.heroes[0]);
      })
  )
  );

  it('should call deleteHero with the clicked "delete-button" button', fakeAsync(
    inject([Router, TestComponentBuilder, HeroService, Location],
      (router: Router, tcb: TestComponentBuilder,
        mockHeroService: HeroService, location: Location) => {
        const f = createRoot(tcb, router, RootCmp);
        expect(location.path()).toEqual('/');
        router.navigateByUrl('/heroes');
        advance(f);
        expect(location.path()).toEqual('/heroes');

        let heroesCompRef = <HeroesComponent>f.debugElement.children[1].componentInstance;
        let heroNative = f.debugElement.nativeElement;
        spyOn(heroesCompRef, "deleteHero");
        heroNative.querySelector('.delete-button').click();
        advance(f);

        expect(heroesCompRef.deleteHero).toHaveBeenCalled();
        expect(heroesCompRef.deleteHero).toHaveBeenCalledWith(heroesCompRef.heroes[0], jasmine.any(Event));
      })
  )
  );

  it('should delete hero', fakeAsync(
    inject([Router, TestComponentBuilder, HeroService, Location],
      (router: Router, tcb: TestComponentBuilder,
        mockHeroService: HeroService, location: Location) => {
        const f = createRoot(tcb, router, RootCmp);
        expect(location.path()).toEqual('/');
        router.navigateByUrl('/heroes');
        advance(f);
        expect(location.path()).toEqual('/heroes');

        let heroesCompRef = <HeroesComponent>f.debugElement.children[1].componentInstance;
        let heroesBeforeDelete = heroesCompRef.heroes;
        let heroToDelete = heroesCompRef.heroes[0];
        heroesCompRef.selectedHero = heroesCompRef.heroes[0];
        heroesCompRef.deleteHero(heroToDelete, document.createEvent("Event"));
        advance(f);

        expect(heroesCompRef.selectedHero).toBeNull();
        expect(heroesCompRef.heroes.length).toEqual(heroesBeforeDelete.length - 1);
        expect(heroesCompRef.heroes.indexOf(heroToDelete)).toEqual(-1);
      })
  )
  );

  it('should display error on getHeroes fail', fakeAsync(
    inject([Router, TestComponentBuilder, HeroService, Location],
      (router: Router, tcb: TestComponentBuilder,
        mockHeroService: HeroService, location: Location) => {
        const f = createRoot(tcb, router, RootCmp);
        spyOn(mockHeroService, "delete").and.callFake(() => Promise.reject("deleteHero fail"));
        expect(location.path()).toEqual('/');

        router.navigateByUrl('/heroes');
        advance(f);
        expect(location.path()).toEqual('/heroes');
        let heroesCompRef = <HeroesComponent>f.debugElement.children[1].componentInstance;
        let heroes = f.debugElement.nativeElement;
        heroesCompRef.deleteHero({ id: 0, name: "Test Hero" }, document.createEvent('Event'));
        advance(f);
        expect(heroes.querySelector('.error').innerHTML).toBe("deleteHero fail");
      })
  )
  );

  it('should navigate to hero detail', fakeAsync(
    inject([Router, TestComponentBuilder, HeroService, Location],
      (router: Router, tcb: TestComponentBuilder,
        mockHeroService: HeroService, location: Location) => {
        const f = createRoot(tcb, router, RootCmp);
        expect(location.path()).toEqual('/');

        router.navigateByUrl('/heroes');
        advance(f);
        expect(location.path()).toEqual('/heroes');

        let heroesCompRef = <HeroesComponent>f.debugElement.children[1].componentInstance;
        heroesCompRef.selectedHero = {id: 0, name: "Test Hero"};
        heroesCompRef.gotoDetail();
        advance(f);
        expect(location.path()).toEqual('/detail/0');
      })
  )
  );
});
