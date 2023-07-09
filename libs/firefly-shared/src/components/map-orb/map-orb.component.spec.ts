import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ComponentMapOrb } from './map-orb.component';

describe('ComponentMapOrb', () => {
  let component: ComponentMapOrb;
  let fixture: ComponentFixture<ComponentMapOrb>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ComponentMapOrb]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentMapOrb);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
