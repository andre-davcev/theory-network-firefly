import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentMapPin } from './map-pin.component';

describe('ComponentMapPin', () => {
  let component: ComponentMapPin;
  let fixture: ComponentFixture<ComponentMapPin>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComponentMapPin ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentMapPin);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
