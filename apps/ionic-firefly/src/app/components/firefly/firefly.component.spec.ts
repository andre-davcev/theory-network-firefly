import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentFirefly } from './firefly.component';

describe('FireflyComponent', () => {
  let component: ComponentFirefly;
  let fixture: ComponentFixture<ComponentFirefly>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [ComponentFirefly]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentFirefly);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
