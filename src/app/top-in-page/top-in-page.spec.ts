import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopInPage } from './top-in-page';

describe('TopInPage', () => {
  let component: TopInPage;
  let fixture: ComponentFixture<TopInPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopInPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopInPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
