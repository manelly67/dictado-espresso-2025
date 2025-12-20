import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TecladoEs } from './teclado-es';

describe('TecladoEs', () => {
  let component: TecladoEs;
  let fixture: ComponentFixture<TecladoEs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TecladoEs]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TecladoEs);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
