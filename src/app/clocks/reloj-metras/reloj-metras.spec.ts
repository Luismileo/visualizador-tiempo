import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelojMetras } from './reloj-metras';

describe('RelojMetras', () => {
  let component: RelojMetras;
  let fixture: ComponentFixture<RelojMetras>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RelojMetras],
    }).compileComponents();

    fixture = TestBed.createComponent(RelojMetras);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
