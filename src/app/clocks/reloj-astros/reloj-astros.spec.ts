import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelojAstros } from './reloj-astros';

describe('RelojAstros', () => {
  let component: RelojAstros;
  let fixture: ComponentFixture<RelojAstros>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RelojAstros],
    }).compileComponents();

    fixture = TestBed.createComponent(RelojAstros);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
