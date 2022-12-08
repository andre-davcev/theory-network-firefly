import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibFireflyWebComponent } from './lib-firefly-web.component';

describe('LibFireflyWebComponent', () => {
  let component: LibFireflyWebComponent;
  let fixture: ComponentFixture<LibFireflyWebComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibFireflyWebComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LibFireflyWebComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
