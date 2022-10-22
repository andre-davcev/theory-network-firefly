import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ComponentIconFirefly } from './icon-firefly.component';

describe('ComponentIconFirefly', () => {
  let component: ComponentIconFirefly;
  let fixture: ComponentFixture<ComponentIconFirefly>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ComponentIconFirefly]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentIconFirefly);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
