import { TestBed } from '@angular/core/testing';

import { DefinirAudio } from './definir-audio';

describe('DefinirAudio', () => {
  let service: DefinirAudio;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DefinirAudio);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
