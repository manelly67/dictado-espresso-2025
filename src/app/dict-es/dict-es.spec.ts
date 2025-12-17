import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DictES } from './dict-es';

describe('DictES', () => {
  let component: DictES;
  let fixture: ComponentFixture<DictES>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DictES]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DictES);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
