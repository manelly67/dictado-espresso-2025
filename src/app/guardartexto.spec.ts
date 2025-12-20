import { TestBed } from '@angular/core/testing';

import { Guardartexto } from './guardartexto';

describe('Guardartexto', () => {
  let service: Guardartexto;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Guardartexto);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
