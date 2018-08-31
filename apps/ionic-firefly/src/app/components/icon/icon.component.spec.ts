import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ComponentIcon } from './icon.component';

describe('ComponentIcon', () => {
  let component: ComponentIcon;
  let fixture: ComponentFixture<ComponentIcon>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComponentIcon ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentIcon);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
