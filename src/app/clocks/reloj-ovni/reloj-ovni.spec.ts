import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelojOvni } from './reloj-ovni';

describe('RelojOvni', () => {
  let component: RelojOvni;
  let fixture: ComponentFixture<RelojOvni>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RelojOvni],
    }).compileComponents();

    fixture = TestBed.createComponent(RelojOvni);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
