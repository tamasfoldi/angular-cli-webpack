/* tslint:disable:no-unused-variable */

import { addProviders, async, inject } from '@angular/core/testing';
import { InMemoryDataService } from './in-memory-data.service';

describe('Service: InMemoryData', () => {
  let heroes =
    [
      { id: 11, name: 'Mr. Nice' },
      { id: 12, name: 'Narco' },
      { id: 13, name: 'Bombasto' },
      { id: 14, name: 'Celeritas' },
      { id: 15, name: 'Magneta' },
      { id: 16, name: 'RubberMan' },
      { id: 17, name: 'Dynama' },
      { id: 18, name: 'Dr IQ' },
      { id: 19, name: 'Magma' },
      { id: 20, name: 'Tornado' }
    ];
  beforeEach(() => {
    addProviders([InMemoryDataService]);
  });

  it('should createddb return with heroes',
    inject([InMemoryDataService],
      (service: InMemoryDataService) => {
        let resp = service.createDb();
        expect(resp).toEqual({ heroes });
      }));
});
