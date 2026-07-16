import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelojAnalogico } from './reloj-analogico';

describe('RelojAnalogico', () => {
  let component: RelojAnalogico;
  let fixture: ComponentFixture<RelojAnalogico>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RelojAnalogico],
    }).compileComponents();

    fixture = TestBed.createComponent(RelojAnalogico);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
