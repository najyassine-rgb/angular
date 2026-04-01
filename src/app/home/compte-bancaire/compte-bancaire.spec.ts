import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompteBancaire } from './compte-bancaire';

describe('CompteBancaire', () => {
  let component: CompteBancaire;
  let fixture: ComponentFixture<CompteBancaire>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompteBancaire],
    }).compileComponents();

    fixture = TestBed.createComponent(CompteBancaire);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
