import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Escribe } from './escribe';

describe('Escribe', () => {
  let component: Escribe;
  let fixture: ComponentFixture<Escribe>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Escribe]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Escribe);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
