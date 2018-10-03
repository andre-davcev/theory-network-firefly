import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentSlide } from './slide.component';

describe('ComponentList', () => {
  let component: ComponentSlide;
  let fixture: ComponentFixture<ComponentSlide>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComponentSlide ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentSlide);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
