import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ComponentIcon } from '@firefly/core';

describe('ComponentIcon', () => {
  let component: ComponentIcon;
  let fixture: ComponentFixture<ComponentIcon>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ComponentIcon ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentIcon);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
