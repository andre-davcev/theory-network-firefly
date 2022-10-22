import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ComponentItemImage } from './item-image.component';

describe('ComponentItemImage', () => {
  let component: ComponentItemImage;
  let fixture: ComponentFixture<ComponentItemImage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ComponentItemImage ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentItemImage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
