import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerbBase } from './verb-base';

describe('VerbBase', () => {
  let component: VerbBase;
  let fixture: ComponentFixture<VerbBase>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerbBase]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerbBase);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
