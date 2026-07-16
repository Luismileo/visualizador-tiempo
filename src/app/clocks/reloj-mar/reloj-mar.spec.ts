import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelojMar } from './reloj-mar';

describe('RelojMar', () => {
  let component: RelojMar;
  let fixture: ComponentFixture<RelojMar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RelojMar],
    }).compileComponents();

    fixture = TestBed.createComponent(RelojMar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
