import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ComponentMapAnnotation } from './map-annotation.component';

describe('ComponentMapAnnotation', () => {
  let component: ComponentMapAnnotation;
  let fixture: ComponentFixture<ComponentMapAnnotation>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ComponentMapAnnotation]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentMapAnnotation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
