import { TestBed } from '@angular/core/testing';

import { Escribe } from './escribe';

describe('Escribe', () => {
  let service: Escribe;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Escribe);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
