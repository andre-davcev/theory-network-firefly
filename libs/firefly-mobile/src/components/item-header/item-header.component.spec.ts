import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ComponentItemHeader } from './item-header.component';

describe('ComponentItemHeader', () => {
  let component: ComponentItemHeader;
  let fixture: ComponentFixture<ComponentItemHeader>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ComponentItemHeader ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentItemHeader);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
