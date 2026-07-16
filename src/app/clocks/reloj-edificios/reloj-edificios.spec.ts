import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelojEdificios } from './reloj-edificios';

describe('RelojEdificios', () => {
  let component: RelojEdificios;
  let fixture: ComponentFixture<RelojEdificios>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RelojEdificios],
    }).compileComponents();

    fixture = TestBed.createComponent(RelojEdificios);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
