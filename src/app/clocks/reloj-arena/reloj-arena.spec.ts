import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelojArena } from './reloj-arena';

describe('RelojArena', () => {
  let component: RelojArena;
  let fixture: ComponentFixture<RelojArena>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RelojArena],
    }).compileComponents();

    fixture = TestBed.createComponent(RelojArena);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
