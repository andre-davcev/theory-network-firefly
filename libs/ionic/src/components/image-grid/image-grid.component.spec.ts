import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentImageGrid } from './image-grid.component';

describe('ComponentImageGrid', () => {
  let component: ComponentImageGrid;
  let fixture: ComponentFixture<ComponentImageGrid>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComponentImageGrid ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentImageGrid);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
