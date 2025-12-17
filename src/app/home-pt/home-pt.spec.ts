import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePT } from './home-pt';

describe('HomePT', () => {
  let component: HomePT;
  let fixture: ComponentFixture<HomePT>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomePT]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomePT);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
