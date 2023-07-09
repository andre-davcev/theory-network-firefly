import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ComponentMap } from './map.component';

describe('ComponentMap', () => {
  let component: ComponentMap;
  let fixture: ComponentFixture<ComponentMap>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ComponentMap]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentMap);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
