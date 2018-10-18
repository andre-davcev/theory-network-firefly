import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentItemMap } from './item-map.component';

describe('ComponentItemMap', () => {
  let component: ComponentItemMap;
  let fixture: ComponentFixture<ComponentItemMap>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComponentItemMap ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentItemMap);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
