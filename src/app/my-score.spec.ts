import { TestBed } from '@angular/core/testing';

import { MyScore } from './my-score';

describe('MyScore', () => {
  let service: MyScore;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyScore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
