import { TestBed } from '@angular/core/testing';

import { MsgCateg } from './msg-categ';

describe('MsgCateg', () => {
  let service: MsgCateg;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MsgCateg);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
