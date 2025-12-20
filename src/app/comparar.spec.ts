import { TestBed } from '@angular/core/testing';

import { Comparar } from './comparar';

describe('Comparar', () => {
  let service: Comparar;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Comparar);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
