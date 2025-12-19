import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DictBase } from './dict-base';

describe('DictBase', () => {
  let component: DictBase;
  let fixture: ComponentFixture<DictBase>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DictBase]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DictBase);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
