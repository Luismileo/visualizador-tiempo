import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelojBacterias } from './reloj-bacterias';

describe('RelojBacterias', () => {
  let component: RelojBacterias;
  let fixture: ComponentFixture<RelojBacterias>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RelojBacterias],
    }).compileComponents();

    fixture = TestBed.createComponent(RelojBacterias);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
