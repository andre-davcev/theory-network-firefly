import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ComponentLoading } from './loading.component';

describe('ComponentLoading', () => {
  let component: ComponentLoading;
  let fixture: ComponentFixture<ComponentLoading>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ComponentLoading]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentLoading);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
