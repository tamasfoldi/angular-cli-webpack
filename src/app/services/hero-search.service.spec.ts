/* tslint:disable:no-unused-variable */

import {
  inject,
  fakeAsync,
  tick,
  TestBed
} from '@angular/core/testing';
import {MockBackend, MockConnection} from '@angular/http/testing';
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
  const API_URL = 'app/heroes/?name=';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        BaseRequestOptions,
        MockBackend,
        HeroSearchService,
        provide(Http, {
          useFactory: (backend: ConnectionBackend,
            defaultOptions: BaseRequestOptions) => {
            return new Http(backend, defaultOptions);
          }, deps: [MockBackend, BaseRequestOptions]
        })
      ]
    });
  });

  it('should search using the term',
    inject([HeroSearchService, MockBackend],
      fakeAsync((heroSearchService: HeroSearchService, mockBackend: MockBackend) => {
        let res;
        mockBackend.connections.subscribe((c: MockConnection) => {
          expect(c.request.url).toBe(API_URL + 'Test Hero');
          let response = new ResponseOptions({
            body: '{"data": { "id": 0, "name": "Test Hero"}}'
          });
          c.mockRespond(new Response(response));
        });
        heroSearchService.search('Test Hero').subscribe(_res => {
          res = _res;
        });
        tick();
        expect(res).toEqual({ id: 0, name: 'Test Hero' });
      }))
  );

});
