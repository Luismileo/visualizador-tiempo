import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelojBinario } from './reloj-binario';

describe('RelojBinario', () => {
  let component: RelojBinario;
  let fixture: ComponentFixture<RelojBinario>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RelojBinario],
    }).compileComponents();

    fixture = TestBed.createComponent(RelojBinario);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
