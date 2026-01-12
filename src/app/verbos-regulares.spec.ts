import { TestBed } from '@angular/core/testing';

import { VerbosRegulares } from './verbos-regulares';

describe('VerbosRegulares', () => {
  let service: VerbosRegulares;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VerbosRegulares);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
