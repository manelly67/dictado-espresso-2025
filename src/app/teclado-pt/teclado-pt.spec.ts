import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TecladoPt } from './teclado-pt';

describe('TecladoPt', () => {
  let component: TecladoPt;
  let fixture: ComponentFixture<TecladoPt>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TecladoPt]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TecladoPt);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
