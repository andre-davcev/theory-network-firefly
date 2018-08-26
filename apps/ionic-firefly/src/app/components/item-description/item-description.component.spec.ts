import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentItemDescription } from './item-description.component';

describe('ComponentItemDescription', () => {
  let component: ComponentItemDescription;
  let fixture: ComponentFixture<ComponentItemDescription>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComponentItemDescription ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentItemDescription);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
