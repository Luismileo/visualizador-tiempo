import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelojDigital } from './reloj-digital';

describe('RelojDigital', () => {
  let component: RelojDigital;
  let fixture: ComponentFixture<RelojDigital>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RelojDigital],
    }).compileComponents();

    fixture = TestBed.createComponent(RelojDigital);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
