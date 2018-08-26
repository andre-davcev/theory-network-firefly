import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentFireflyIcon } from './firefly-icon.component';

describe('FireflyComponent', () => {
  let component: ComponentFireflyIcon;
  let fixture: ComponentFixture<ComponentFireflyIcon>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [ComponentFireflyIcon]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentFireflyIcon);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
