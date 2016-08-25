/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { DashboardComponent } from './dashboard.component';
import { routeTestProviders, createRoot, advance, RootCmp } from '../../helpers/route.provider.helper';
import { HeroService } from '../hero.service';
import { HeroMockService } from '../../helpers/hero.mock.service';
import {
  inject,
  fakeAsync,
  addProviders
} from '@angular/core/testing';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { TestComponentBuilder } from '@angular/core/testing';
import { AppComponent } from '../app.component';

describe('Component: Dashboard', () => {
  beforeEach(() => {
    addProviders([routeTestProviders(),
      { provide: HeroService, useClass: HeroMockService }]);
  });

  describe('initialization', () => {
    it('retrieves the track', fakeAsync(
      inject([Router, TestComponentBuilder, HeroService],
        (router: Router, tcb: TestComponentBuilder,
          mockHeroService: HeroMockService) => {
          const f = createRoot(tcb, router, RootCmp);     
          router.initialNavigation();
          tick();
          f.detectChanges();          

          let dashboard = f.debugElement.nativeElement;
          expect(dashboard.querySelectorAll('.hero').length).toBe(2);
        })));
  });
});
