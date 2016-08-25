/* tslint:disable:no-unused-variable */

import { addProviders, async, inject } from '@angular/core/testing';
import { HeroService } from './hero.service';

describe('Service: Hero', () => {
  beforeEach(() => {
    addProviders([HeroService]);
  });

  it('should ...',
    inject([HeroService],
      (service: HeroService) => {
        expect(service).toBeTruthy();
      }));
});
