/* tslint:disable:no-unused-variable */

import {
  inject,
  fakeAsync,
  tick,
  addProviders
} from '@angular/core/testing';
import {MockBackend} from '@angular/http/testing';
import {provide} from '@angular/core';
import {
  Http,
  ConnectionBackend,
  BaseRequestOptions,
  Response,
  ResponseOptions
} from '@angular/http';
import { HeroSearchService } from './hero-search.service';

describe('Service: Hero', () => {
  beforeEach(() => {
    addProviders([
      BaseRequestOptions,
      MockBackend,
      HeroSearchService,
      provide(Http, {
        useFactory: (backend: ConnectionBackend,
          defaultOptions: BaseRequestOptions) => {
          return new Http(backend, defaultOptions);
        }, deps: [MockBackend, BaseRequestOptions]
      }),
    ]);
  });

  it('should ...',
    inject([HeroSearchService],
      (service: HeroSearchService) => {
        expect(service).toBeTruthy();
      }));
});
