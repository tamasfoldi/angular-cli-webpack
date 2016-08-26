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
});
