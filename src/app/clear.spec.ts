import { TestBed } from '@angular/core/testing';

import { Clear } from './clear';

describe('Clear', () => {
  let service: Clear;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Clear);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
