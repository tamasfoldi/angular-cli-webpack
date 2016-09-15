/* tslint:disable:no-unused-variable */

import {
  inject,
  fakeAsync,
  tick,
  TestBed
} from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { Observable } from 'rxjs/Rx';
import {
  Http,
  ConnectionBackend,
  BaseRequestOptions,
  Response,
  ResponseOptions,
  RequestMethod
} from '@angular/http';
import { HeroService } from './hero.service';


describe('Hero Service', () => {
  const heroesUrl = 'app/heroes';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        BaseRequestOptions,
        MockBackend,
        HeroService,
        {
          provide: Http,
          useFactory: (backend: ConnectionBackend,
            defaultOptions: BaseRequestOptions) => {
            return new Http(backend, defaultOptions);
          }, deps: [MockBackend, BaseRequestOptions]
        }
      ]
    });
  });

  describe('getHeroes', () => {

    it('should return with heroes',
      inject([HeroService, MockBackend],
        fakeAsync((service: HeroService, mockBackend: MockBackend) => {
          let resp;
          mockBackend.connections.subscribe((c: MockConnection) => {
            expect(c.request.url).toBe(heroesUrl);
            expect(c.request.method).toBe(RequestMethod.Get);
            let response = new ResponseOptions({
              body: '{"data": [{"id": 0, "name": "Test Hero"}]}'
            });
            c.mockRespond(new Response(response));
          });
          service.getHeroes().then(_res => {
            resp = _res;
          });
          tick();
          expect(resp).toEqual([{ id: 0, name: 'Test Hero' }]);
        }))
    );

    it('should return with an error',
      inject([HeroService, MockBackend],
        fakeAsync((service: HeroService, mockBackend: MockBackend) => {
          let errorResp;
          mockBackend.connections.subscribe((c: MockConnection) => {
            expect(c.request.url).toBe(heroesUrl);
            expect(c.request.method).toBe(RequestMethod.Get);
            c.mockError(new Error('ERROR TEST'));
          });
          service.getHeroes().then(() => { }, _rej => {
            errorResp = _rej;
          });
          tick();
          expect(errorResp).toEqual('ERROR TEST');
        }))
    );

    it('should return with an error 2', // for 100% branch coverage
      inject([HeroService, MockBackend],
        fakeAsync((service: HeroService, mockBackend: MockBackend) => {
          let errorResp;
          mockBackend.connections.subscribe((c: MockConnection) => {
            expect(c.request.url).toBe(heroesUrl);
            expect(c.request.method).toBe(RequestMethod.Get);
            c.mockError(<any>'ERROR TEST');
          });
          service.getHeroes().then(() => { }, _rej => {
            errorResp = _rej;
          });
          tick();
          expect(errorResp).toEqual('ERROR TEST');
        }))
    );

  });

  describe('getHero', () => {

    it('should return with heroe',
      inject([HeroService],
        fakeAsync((service: HeroService) => {
          let resp;
          spyOn(service, 'getHeroes').and.returnValue(
            Observable.of([{ id: 0, name: 'Test Hero' }]).toPromise()
          );
          service.getHero(0).then(_res => {
            resp = _res;
          });
          tick();
          expect(resp).toEqual({ id: 0, name: 'Test Hero' });
        }))
    );
  });

  describe('save', () => {

    it('should call update(PUT) a hero',
      inject([HeroService, MockBackend],
        fakeAsync((service: HeroService, mockBackend: MockBackend) => {
          let resp;
          mockBackend.connections.subscribe((c: MockConnection) => {
            expect(c.request.url).toBe(`${heroesUrl}/1`);
            expect(c.request.method).toBe(RequestMethod.Put);
            let response = new ResponseOptions({
              body: '{"data": {"id": 1, "name": "Test Hero"}}'
            });
            c.mockRespond(new Response(response));
          });
          service.save({ id: 1, name: 'Test Hero' }).then(_rsp => {
            resp = _rsp;
          });
          tick();
          expect(resp).toEqual({ id: 1, name: 'Test Hero' });
        }))
    );

    it('should POST the new hero',
      inject([HeroService, MockBackend],
        fakeAsync((service: HeroService, mockBackend: MockBackend) => {
          let resp;
          mockBackend.connections.subscribe((c: MockConnection) => {
            expect(c.request.url).toBe(heroesUrl);
            expect(c.request.method).toBe(RequestMethod.Post);
            let response = new ResponseOptions({
              body: '{"data": {"id": 0, "name": "Test Hero"}}'
            });
            c.mockRespond(new Response(response));
          });
          service.save({ id: 0, name: 'Test Hero' }).then(_rsp => {
            resp = _rsp;
          });
          tick();
          expect(resp).toEqual({ id: 0, name: 'Test Hero' });
        }))
    );
  });

  describe('delete', () => {
    it('should delete a hero',
      inject([HeroService, MockBackend],
        fakeAsync((service: HeroService, mockBackend: MockBackend) => {
          let resp;
          mockBackend.connections.subscribe((c: MockConnection) => {
            expect(c.request.url).toBe(`${heroesUrl}/0`);
            expect(c.request.method).toBe(RequestMethod.Delete);
            let response = new ResponseOptions({
              status: 200,
              statusText: 'OK'
            });
            c.mockRespond(new Response(response));
          });
          service.delete({ id: 0, name: 'Test Hero' }).then(_rsp => {
            resp = _rsp;
          });
          tick();
          expect(resp).toEqual(new Response(new ResponseOptions({ status: 200, statusText: 'OK' })));
        }))
    );
  });
});
