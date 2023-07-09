import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ComponentIconSubscribe } from './icon-subscribe.component';

describe('ComponentIconSubscribe', () => {
  let component: ComponentIconSubscribe;
  let fixture: ComponentFixture<ComponentIconSubscribe>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ComponentIconSubscribe]
    }).compileComponents();
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
