import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Flux } from './flux';

describe('Flux', () => {
  let component: Flux;
  let fixture: ComponentFixture<Flux>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Flux],
    }).compileComponents();

    fixture = TestBed.createComponent(Flux);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
