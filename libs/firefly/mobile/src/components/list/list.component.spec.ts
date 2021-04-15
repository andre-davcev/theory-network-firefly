import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ComponentList } from './list.component';

describe('ComponentList', () => {
  let component: ComponentList;
  let fixture: ComponentFixture<ComponentList>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ComponentList ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
