import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ComponentImageGrid } from './image-grid.component';

describe('ComponentImageGrid', () => {
  let component: ComponentImageGrid;
  let fixture: ComponentFixture<ComponentImageGrid>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ComponentImageGrid]
    }).compileComponents();
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
