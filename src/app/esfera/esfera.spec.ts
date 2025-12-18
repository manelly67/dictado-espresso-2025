import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Esfera } from './esfera';

describe('Esfera', () => {
  let component: Esfera;
  let fixture: ComponentFixture<Esfera>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Esfera]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Esfera);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
