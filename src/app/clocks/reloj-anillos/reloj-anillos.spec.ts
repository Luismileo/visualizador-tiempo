import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelojAnillos } from './reloj-anillos';

describe('RelojAnillos', () => {
  let component: RelojAnillos;
  let fixture: ComponentFixture<RelojAnillos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RelojAnillos],
    }).compileComponents();

    fixture = TestBed.createComponent(RelojAnillos);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
