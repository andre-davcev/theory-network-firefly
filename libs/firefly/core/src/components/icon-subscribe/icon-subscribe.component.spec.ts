import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentIconSubscribe } from './icon-subscribe.component';

describe('ComponentIconSubscribe', () => {
  let component: ComponentIconSubscribe;
  let fixture: ComponentFixture<ComponentIconSubscribe>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComponentIconSubscribe ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentIconSubscribe);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
