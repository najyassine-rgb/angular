import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParametrageLibelle } from './parametrage-libelle';

describe('ParametrageLibelle', () => {
  let component: ParametrageLibelle;
  let fixture: ComponentFixture<ParametrageLibelle>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParametrageLibelle],
    }).compileComponents();

    fixture = TestBed.createComponent(ParametrageLibelle);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
