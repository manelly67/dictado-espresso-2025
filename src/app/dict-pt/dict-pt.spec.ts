import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DictPT } from './dict-pt';

describe('DictPT', () => {
  let component: DictPT;
  let fixture: ComponentFixture<DictPT>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DictPT]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DictPT);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
